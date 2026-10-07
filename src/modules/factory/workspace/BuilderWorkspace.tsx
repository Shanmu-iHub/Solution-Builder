import React, { useEffect, useState } from 'react';
import { CheckCircle2, Cloud, Code, Database, Download, FileText, GitBranch, Maximize2, Minimize2, Monitor, Share2 } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';
import { Button, Dialog, Toggle, cx, useToast, CSuiteValidation } from '../../ui';
import { useFactory } from '../FactoryStore';
import { FactoryProject } from '../types';
import { ChatPane } from './ChatPane';
import { CodePanel } from './CodePanel';
import { DatabasePanel } from './DatabasePanel';
import { DeploymentPanel } from './DeploymentPanel';
import { GitPanel } from './GitPanel';
import { PlanPanel } from './PlanPanel';
import { PreviewPanel } from './PreviewPanel';
import { TokenDialog } from './TokenDialog';

type Tab = 'plan' | 'preview' | 'code' | 'git' | 'database' | 'deployment';

const ALL_TABS: { id: Tab; label: string; icon: typeof Code }[] = [
  { id: 'plan', label: 'Plan', icon: FileText },
  { id: 'preview', label: 'Preview', icon: Monitor },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'deployment', label: 'Deployment', icon: Cloud },
];

/** Shared IDE-style workspace for Full Stack and UI Canvas projects. */
export const BuilderWorkspace: React.FC<{ project: FactoryProject; onBack: () => void }> = ({ project, onBack }) => {
  const f = useFactory();
  const { setCanvasMode } = useNavigation();
  const { toast } = useToast();
  const id = project.projectId;
  const state = f.ws(id);
  const isUi = project.kind === 'ui-canvas';
  const tabs = isUi ? ALL_TABS.filter(t => t.id !== 'database') : ALL_TABS;

  const [tab, setTab] = useState<Tab>(state.planStatus === 'APPROVED' ? 'preview' : 'plan');
  const [expanded, setExpanded] = useState(false);
  const [tokensOpen, setTokensOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [csuiteOpen, setCsuiteOpen] = useState(false);

  useEffect(() => { setCanvasMode(true); return () => setCanvasMode(false); }, [setCanvasMode]);

  // jump to Plan when the assistant asks questions; to Preview when a build finishes
  useEffect(() => { if (state.clarificationStatus === 'AWAITING_USER' && !isUi) setTab('plan'); }, [state.clarificationStatus, isUi]);
  const wasGenerating = React.useRef(false);
  useEffect(() => {
    if (wasGenerating.current && !state.generating && state.previewReady) setTab('preview');
    if (!wasGenerating.current && state.generating) setTab(t => (t === 'plan' && !isUi ? 'code' : t));
    wasGenerating.current = state.generating;
  }, [state.generating, state.previewReady, isUi]);

  const fileCount = Object.keys(state.files).length;
  const status = state.generating ? { label: 'Building', cls: 'text-amber-500', dot: 'bg-amber-400 animate-ping' } : state.previewReady ? { label: 'Live', cls: 'text-emerald-600', dot: 'bg-emerald-500' } : { label: 'Ready', cls: 'text-slate-400', dot: 'bg-slate-400' };

  const exportProject = () => {
    if (!fileCount) return toast({ title: 'No code files to export yet', description: 'Build something first!', tone: 'error' });
    const url = URL.createObjectURL(new Blob([JSON.stringify(state.files, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.projectName.replace(/\s+/g, '-').toLowerCase()}-files.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${fileCount} files downloaded as a JSON bundle (prototype export).` });
  };

  const prompts = isUi
    ? ['Create a modern landing page for a B2B analytics product with a hero, feature grid, pricing table, testimonials and a demo request form.', 'Add a dark-mode toggle to the header and a sticky navigation bar.', 'Add an FAQ accordion and a footer with newsletter sign-up.']
    : ['Build a vendor management portal with supplier onboarding, contract tracking, invoice approvals, role-based access and an audit log.', 'Add a monthly spend chart to the dashboard and a CSV export on the records table.', 'Add email notifications when an invoice is approved or rejected.'];
  const suggestions = isUi
    ? ['Create a modern SaaS landing page with hero, pricing and testimonials', 'Add a dark mode toggle to the header', 'Build a pricing comparison table']
    : ['Build an admin dashboard with KPI cards, a searchable records table and settings', 'I need an inventory tracker with low-stock alerts', 'Create a customer portal with login and order history'];

  return (
    <div className="h-full w-full flex bg-slate-100/60">
      {!expanded && (
        <div className="w-[30%] min-w-[320px] max-w-[460px] shrink-0 border-r border-slate-200 bg-white">
          <ChatPane
            projectName={project.projectName}
            state={state}
            placeholder={isUi ? 'Describe the page or change you want…' : 'Describe what you want to build…'}
            onBack={onBack}
            onSend={t => f.send(id, t)}
            onStop={() => f.stop(id)}
            onJumpToFile={file => { f.setActiveFile(id, file); setTab('code'); }}
            onOpenPlan={() => setTab('plan')}
            onOpenTokens={() => setTokensOpen(true)}
            suggestions={suggestions}
            prompts={prompts}
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:px-4">
          <div className="flex items-center gap-3 min-w-0 overflow-x-auto">
            <div className="flex shrink-0 rounded-full bg-slate-100 p-1 border border-slate-200">
              {tabs.map(t => {
                const I = t.icon;
                return (
                  <button key={t.id} onClick={() => setTab(t.id)} className={cx('flex items-center gap-1.5 rounded-full px-3 sm:px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer', tab === t.id ? 'bg-[#0F172A] text-white shadow-subtle' : 'text-slate-500 hover:text-[#0F172A]')}>
                    <I className="w-3.5 h-3.5" />{t.label}
                  </button>
                );
              })}
            </div>
            <span className={cx('hidden xl:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider shrink-0', status.cls)}><span className={cx('w-1.5 h-1.5 rounded-full', status.dot)} />{status.label}</span>
            
            <div className="shrink-0">
              <button onClick={() => setCsuiteOpen(true)} className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-emerald-700 hover:bg-emerald-100 shrink-0 cursor-pointer transition-colors ml-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                C-Suite Validation
              </button>
              {csuiteOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setCsuiteOpen(false)}>
                  <div className="w-full max-w-[420px] shadow-2xl rounded-xl" onClick={e => e.stopPropagation()}>
                    <CSuiteValidation stageId="solution-factory" status={state.previewReady ? 'Validated' : 'Pending'} className="border-0 ring-1 ring-slate-200" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setExpanded(e => !e)} title={expanded ? 'Show chat' : 'Expand workspace'} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">{expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}</button>
            <span className="w-px h-4 bg-slate-200" />
            <Button size="sm" icon={<Share2 className="w-3.5 h-3.5" />} className="hidden md:inline-flex !bg-emerald-50 !text-emerald-700 !border-emerald-200 hover:!bg-emerald-100" onClick={() => setShareOpen(true)}>Share</Button>
            <Button size="sm" variant="dark" icon={<Download className="w-3.5 h-3.5" />} onClick={exportProject}>Export</Button>
          </div>
        </div>

        <div className="flex-1 min-h-0 p-2 lg:p-5 overflow-hidden flex">
          <div className="flex-1 min-w-0 overflow-y-auto">
          {tab === 'plan' && <PlanPanel projectId={id} state={state} onSubmitClarifications={a => f.submitClarifications(id, a)} onProceed={() => f.proceedPlan(id)} />}
          {tab === 'preview' && <PreviewPanel appName={project.projectName} state={state} onRefresh={() => f.restartPreview(id)} onPage={p => f.setPage(id, p)} />}
          {tab === 'code' && <CodePanel state={state} onPick={file => f.setActiveFile(id, file)} onSave={(file, content) => { f.saveFile(id, file, content); toast({ title: 'File saved', description: file }); }} />}
          {tab === 'git' && <GitPanel projectName={project.projectName} state={state} hasFiles={fileCount > 0} onConnect={() => f.connectGithub(id)} onDisconnect={() => f.disconnectGithub(id)} onPublish={o => f.publishRepo(id, o)} onDeleteRepo={() => f.deleteRepo(id)} onCommit={m => f.commit(id, m)} />}
          {tab === 'database' && !isUi && <DatabasePanel hasSchema={!!state.files['prisma/schema.prisma']} />}
          {tab === 'deployment' && <DeploymentPanel projectId={id} projectName={project.projectName} state={state} hasFiles={fileCount > 0} onDeploy={(p, n) => f.deploy(id, p, n)} onStop={d => f.stopDeployment(id, d)} onPublicLink={on => f.togglePublicLink(id, on)} onOpenGit={() => setTab('git')} />}
          </div>
        </div>
      </div>

      <TokenDialog open={tokensOpen} onClose={() => setTokensOpen(false)} logs={state.tokens} />
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)} title="Share project" subtitle="Control who can view the live application." width="max-w-md" footer={<Button onClick={() => setShareOpen(false)}>Done</Button>}>
        <div className="space-y-4">
          <Toggle checked={state.publicLink} onChange={on => f.togglePublicLink(id, on)} label={state.publicLink ? 'Anyone with the link can view' : 'Private — only you'} />
          {state.publicLink && <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"><code className="text-[13.5px] font-mono text-slate-600 truncate">{`${location.origin}/share/${id}`}</code><Button size="xs" onClick={async () => { try { await navigator.clipboard.writeText(`${location.origin}/share/${id}`); } catch { /* ignore */ } toast({ title: 'Link copied' }); }}>Copy</Button></div>}
        </div>
      </Dialog>
    </div>
  );
};
