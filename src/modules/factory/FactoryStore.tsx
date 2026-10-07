import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { sleep, uid } from '../ui';
import { BUILD_ORDER, buildPlanMarkdown, builtWorkspace, defaultQuestions, emptyWorkspace, seedFactoryProjects, seedRepoGroups, templateFiles } from './mockData';
import { ChatMessage, DeploymentRecord, FactoryKind, FactoryProject, RepoGroup, WorkspaceState } from './types';

interface Store {
  projects: FactoryProject[];
  groups: RepoGroup[];
  createProject: (kind: FactoryKind, input: { projectName: string; description: string; sourceType?: 'github' | 'upload'; sourceRef?: string }) => Promise<FactoryProject>;
  deleteProject: (id: string) => void;
  ws: (id: string) => WorkspaceState;
  send: (id: string, text: string) => void;
  stop: (id: string) => void;
  submitClarifications: (id: string, answers: Record<string, { question: string; answer: string }>) => Promise<void>;
  proceedPlan: (id: string) => void;
  setActiveFile: (id: string, file: string) => void;
  saveFile: (id: string, file: string, content: string) => void;
  setPage: (id: string, page: string) => void;
  connectGithub: (id: string) => void;
  disconnectGithub: (id: string) => void;
  publishRepo: (id: string, opts: { repoName: string; description: string; visibility: string }) => Promise<void>;
  deleteRepo: (id: string) => void;
  commit: (id: string, message: string) => void;
  deploy: (id: string, provider: string, projectName: string) => Promise<DeploymentRecord>;
  stopDeployment: (id: string, deploymentId: string) => void;
  togglePublicLink: (id: string, on: boolean) => void;
  restartPreview: (id: string) => void;
  startFromPlan: (name: string, description: string, planMarkdown: string) => FactoryProject;
  createGroup: (name: string, description: string, projectIds: string[]) => void;
  deleteGroup: (id: string) => void;
}

const Ctx = createContext<Store | null>(null);

const seedWorkspaces = (): Record<string, WorkspaceState> => ({
  'fs-ecom': builtWorkspace('E-Commerce Dashboard'),
  'fs-loyalty': { ...builtWorkspace('Customer Loyalty Portal'), git: { connected: false, branch: 'main', commits: [] }, deployments: [], activeFile: 'app/page.tsx' },
  'fs-hr': builtWorkspace('HR Leave Management'),
  'ui-portal': { ...builtWorkspace('Customer Self-Service Portal'), pages: ['Overview', 'Invoices', 'Support'], activePage: 'Overview', deployments: [] },
  'ui-landing': { ...builtWorkspace('SaaS Landing Page'), pages: ['Home', 'Pricing', 'Contact'], activePage: 'Home' },
  'ui-admin': { ...builtWorkspace('Analytics Admin Kit'), deployments: [] },
});

const pascal = (s: string) => s.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 3).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('') || 'Feature';

export const FactoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<FactoryProject[]>(seedFactoryProjects);
  const [groups, setGroups] = useState<RepoGroup[]>(seedRepoGroups);
  const [workspaces, setWorkspaces] = useState<Record<string, WorkspaceState>>(seedWorkspaces);
  const cancelled = useRef<Set<string>>(new Set());
  const empty = useRef(emptyWorkspace());
  const wsRef = useRef(workspaces);
  wsRef.current = workspaces;
  const projectsRef = useRef(projects);
  projectsRef.current = projects;

  const update = useCallback((id: string, fn: (w: WorkspaceState) => WorkspaceState) => setWorkspaces(all => ({ ...all, [id]: fn(all[id] ?? emptyWorkspace()) })), []);
  const patchMsg = useCallback((id: string, msgId: string, fn: (m: ChatMessage) => ChatMessage) => update(id, w => ({ ...w, messages: w.messages.map(m => (m.id === msgId ? fn(m) : m)) })), [update]);

  const typewriter = useCallback(async (id: string, msgId: string, text: string) => {
    for (let i = 0; i < text.length; i += 5) {
      if (cancelled.current.has(id)) return false;
      patchMsg(id, msgId, m => ({ ...m, content: text.slice(0, i + 5) }));
      await sleep(18);
    }
    return true;
  }, [patchMsg]);

  const say = useCallback(async (id: string, text: string, activity?: ChatMessage['activity']) => {
    const msgId = uid('m');
    update(id, w => ({ ...w, messages: [...w.messages, { id: msgId, role: 'assistant', content: '', streaming: true, activity }] }));
    const ok = await typewriter(id, msgId, text);
    patchMsg(id, msgId, m => ({ ...m, streaming: false, content: ok ? text : m.content + ' …(stopped)' }));
    return msgId;
  }, [update, typewriter, patchMsg]);

  const runBuild = useCallback(async (id: string, prompt: string, kind: FactoryKind) => {
    cancelled.current.delete(id);
    const project = projectsRef.current.find(p => p.projectId === id);
    const name = project?.projectName || 'Application';
    update(id, w => ({ ...w, generating: true }));
    const first = Object.keys(wsRef.current[id]?.files ?? {}).length === 0;

    const all = templateFiles(name);
    const targets = first ? (kind === 'ui-canvas' ? BUILD_ORDER.filter(f => !f.startsWith('prisma') && !f.startsWith('lib') && !f.includes('api')) : BUILD_ORDER) : [];
    const extra = first ? null : `components/${pascal(prompt)}.tsx`;
    const steps: NonNullable<ChatMessage['activity']> = first
      ? [{ label: 'Initializing Next.js application', done: false }, { label: 'Designing component architecture', done: false }, ...targets.map(f => ({ label: `Writing ${f}`, file: f, done: false }))]
      : [{ label: 'Reading the current code', done: false }, { label: `Writing ${extra}`, file: extra!, done: false }, { label: 'Updating app/page.tsx', file: 'app/page.tsx', done: false }];

    const msgId = uid('m');
    update(id, w => ({ ...w, messages: [...w.messages, { id: msgId, role: 'assistant', content: '', streaming: true, activity: steps }] }));
    update(id, w => ({ ...w, terminal: [...w.terminal, first ? '$ npx create-next-app@latest .' : `$ # ${prompt.slice(0, 60)}`] }));

    for (let i = 0; i < steps.length; i++) {
      if (cancelled.current.has(id)) break;
      await sleep(first ? 520 : 650);
      const step = steps[i];
      patchMsg(id, msgId, m => ({ ...m, activity: m.activity!.map((a, k) => (k === i ? { ...a, done: true } : a)) }));
      if (step.file) {
        if (first) update(id, w => ({ ...w, files: { ...w.files, [step.file!]: all[step.file!] }, activeFile: w.activeFile || step.file!, terminal: [...w.terminal, `✔ wrote ${step.file}`] }));
        else if (step.file === extra) update(id, w => ({ ...w, files: { ...w.files, [extra!]: `// ${prompt}\nexport function ${pascal(prompt)}() {\n  return (\n    <section className="rounded-2xl border border-slate-200 bg-white p-6">\n      <h2 className="text-[19px] font-bold">${prompt.replace(/"/g, "'").slice(0, 60)}</h2>\n      <p className="text-[15px] text-slate-500">Generated from your last instruction.</p>\n    </section>\n  );\n}\n` }, activeFile: extra!, terminal: [...w.terminal, `✔ wrote ${extra}`] }));
        else update(id, w => ({ ...w, files: { ...w.files, 'app/page.tsx': `import { ${pascal(prompt)} } from '@/components/${pascal(prompt)}';\n${w.files['app/page.tsx'] || ''}`.replace(/\n<\/section>/, `\n      <${pascal(prompt)} />\n    </section>`) } }));
      }
    }

    const stopped = cancelled.current.has(id);
    const finalText = stopped
      ? 'Generation paused. Tell me how to continue.'
      : first
        ? `Done! I scaffolded **${name}** — ${targets.length} files written, dependencies installed and the dev server is running. Open the **Preview** tab to try it, or **Code** to browse the files.`
        : `Done — I added a new section from your request ("${prompt.slice(0, 70)}") and refreshed the preview.`;
    await typewriter(id, msgId, finalText);
    patchMsg(id, msgId, m => ({ ...m, streaming: false }));
    const input = 3200 + Math.floor(Math.random() * 2400);
    update(id, w => ({
      ...w, generating: false, previewReady: !stopped || w.previewReady, previewRevision: w.previewRevision + 1,
      planStatus: 'APPROVED',
      planMarkdown: (w.planMarkdown || buildPlanMarkdown(name, {})).replace('- [ ] Implement data layer and API routes', '- [x] Implement data layer and API routes').replace('- [ ] Build dashboard and list screens', '- [x] Build dashboard and list screens'),
      tokens: [...w.tokens, { id: uid('t'), step: first ? 'Code generation — full application' : 'Code generation — change request', model: 'claude-sonnet-5-5', input, output: Math.round(input * 1.7), at: new Date().toISOString() }],
      terminal: first && !stopped ? [...w.terminal, '$ npm run dev', '▲ Next.js 15.1.0', '- Local: http://localhost:3000', '✓ Ready in 1.9s'] : w.terminal,
    }));
  }, [update, patchMsg, typewriter]);

  const getKind = (id: string) => projectsRef.current.find(p => p.projectId === id)?.kind ?? 'full-stack';

  const store: Store = {
    projects,
    groups,

    createProject: async (kind, input) => {
      await sleep(600);
      const now = new Date().toISOString();
      const project: FactoryProject = {
        projectId: `${kind.slice(0, 2)}-${uid('p').slice(2)}`, kind, projectName: input.projectName, description: input.description, createdAt: now, updatedAt: now,
        ...(kind === 'code-migration' && { sourceLanguage: 'Python · Flask', targetLanguage: 'Python · FastAPI', sourceType: input.sourceType, sourceRef: input.sourceRef }),
      };
      setProjects(p => [project, ...p]);
      return project;
    },
    deleteProject: id => { setProjects(p => p.filter(x => x.projectId !== id)); setWorkspaces(w => { const { [id]: _drop, ...rest } = w; return rest; }); },

    ws: id => workspaces[id] ?? empty.current,

    send: (id, text) => {
      const kind = getKind(id);
      const w = workspaces[id] ?? emptyWorkspace();
      update(id, x => ({ ...x, messages: [...x.messages, { id: uid('m'), role: 'user', content: text }] }));
      if (w.generating) return;
      void (async () => {
        await sleep(300);
        if (kind === 'full-stack' && w.planStatus !== 'APPROVED') {
          if (w.clarificationStatus === 'NONE') {
            await say(id, 'Great idea. Before I write any code I have a few architecture questions — please answer them in the **Plan** tab so I can draft a tailored implementation plan.');
            update(id, x => ({ ...x, questions: defaultQuestions, clarificationStatus: 'AWAITING_USER', clarificationSummary: `Please confirm the key decisions for "${projectsRef.current.find(p => p.projectId === id)?.projectName}" to generate a tailored plan.` }));
          } else if (w.planStatus === 'DRAFT') {
            await say(id, 'The plan is ready in the **Plan** tab. Review it, then click **Proceed to Build** — or tell me what to adjust.');
          } else {
            await say(id, 'Still waiting for your answers in the **Plan** tab. Once you generate the plan we can start building.');
          }
          return;
        }
        
        if (kind === 'ui-canvas' && w.planStatus !== 'APPROVED') {
          const name = projectsRef.current.find(p => p.projectId === id)?.projectName || 'UI Canvas Project';
          update(id, x => ({ ...x, planMarkdown: buildPlanMarkdown(name, {}), planStatus: 'APPROVED', clarificationStatus: 'ANSWERED' }));
        }
        
        await runBuild(id, text, kind);
      })();
    },

    stop: id => { cancelled.current.add(id); },

    submitClarifications: async (id, answers) => {
      await sleep(1600);
      const name = projectsRef.current.find(p => p.projectId === id)?.projectName || 'Application';
      update(id, w => ({ ...w, clarificationStatus: 'ANSWERED', planMarkdown: buildPlanMarkdown(name, answers), planStatus: 'DRAFT', tokens: [...w.tokens, { id: uid('t'), step: 'Implementation plan', model: 'claude-sonnet-5-5', input: 3800, output: 2300, at: new Date().toISOString() }] }));
      void say(id, 'I drafted the implementation plan from your decisions. Review it in the **Plan** tab and click **Proceed to Build** when you are happy.');
    },

    proceedPlan: id => {
      update(id, w => ({ ...w, planStatus: 'APPROVED' }));
      void runBuild(id, 'Implement the approved plan', getKind(id));
    },

    setActiveFile: (id, file) => update(id, w => ({ ...w, activeFile: file })),
    saveFile: (id, file, content) => update(id, w => ({ ...w, files: { ...w.files, [file]: content }, previewRevision: w.previewRevision + 1 })),
    setPage: (id, page) => update(id, w => ({ ...w, activePage: page })),

    connectGithub: id => update(id, w => ({ ...w, git: { ...w.git, connected: true, account: 'demo-user' } })),
    disconnectGithub: id => update(id, w => ({ ...w, git: { connected: false, branch: 'main', commits: [] } })),
    publishRepo: async (id, opts) => {
      await sleep(1800);
      update(id, w => ({ ...w, git: { ...w.git, repoName: opts.repoName, repoUrl: `https://github.com/${w.git.account || 'demo-user'}/${opts.repoName}`, commits: [{ hash: uid('c').slice(2, 9), message: 'chore: initial commit from Solution Factory', at: new Date().toISOString() }] } }));
    },
    deleteRepo: id => update(id, w => ({ ...w, git: { ...w.git, repoName: undefined, repoUrl: undefined, commits: [] } })),
    commit: (id, message) => update(id, w => ({ ...w, git: { ...w.git, commits: [{ hash: uid('c').slice(2, 9), message, at: new Date().toISOString() }, ...w.git.commits] } })),

    deploy: async (id, provider, projectName) => {
      await sleep(3200);
      const rec: DeploymentRecord = { id: uid('d'), provider, projectName, url: `https://${projectName}.${provider.startsWith('Cloudflare') ? 'pages.dev' : provider === 'Vercel' ? 'vercel.app' : 'netlify.app'}`, status: 'live', at: new Date().toISOString() };
      update(id, w => ({ ...w, deployments: [rec, ...w.deployments.map(d => ({ ...d, status: 'stopped' as const }))] }));
      return rec;
    },
    stopDeployment: (id, did) => update(id, w => ({ ...w, deployments: w.deployments.map(d => (d.id === did ? { ...d, status: 'stopped' } : d)) })),
    togglePublicLink: (id, on) => update(id, w => ({ ...w, publicLink: on })),
    restartPreview: id => update(id, w => ({ ...w, previewRevision: w.previewRevision + 1, previewReady: true, terminal: [...w.terminal, '$ restart dev server', '✓ Ready in 1.2s'] })),

    startFromPlan: (name, description, planMarkdown) => {
      const now = new Date().toISOString();
      const project: FactoryProject = { projectId: `fs-${uid('p').slice(2)}`, kind: 'full-stack', projectName: name, description, createdAt: now, updatedAt: now };
      setProjects(p => [project, ...p]);
      setWorkspaces(w => ({ ...w, [project.projectId]: { ...emptyWorkspace(), planMarkdown, planStatus: 'APPROVED', clarificationStatus: 'ANSWERED', questions: defaultQuestions, messages: [{ id: uid('m'), role: 'assistant', content: 'I imported the approved **Solution Planner** roadmap as the implementation plan. Say **start building** (or add any extra instructions) and I will generate the application.' }] } }));
      return project;
    },

    createGroup: (name, description, projectIds) => setGroups(g => [{ id: uid('rg'), name, description, projectIds, updatedAt: new Date().toISOString(), crossCalls: projectIds.length > 1 ? [{ from: 'service-a', to: 'service-b', via: 'POST /v1/sync', count: 7 }] : [] }, ...g]),
    deleteGroup: id => setGroups(g => g.filter(x => x.id !== id)),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const useFactory = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFactory must be used within FactoryProvider');
  return ctx;
};
