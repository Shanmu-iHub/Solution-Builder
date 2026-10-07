import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Cloud,
  Code,
  Database,
  Download,
  FileText,
  GitBranch,
  Layers,
  Maximize2,
  Minimize2,
  Monitor,
  Share2,
  Zap,
} from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';
import { Button, Dialog, Toggle, cx, useToast } from '../../ui';
import { useFactory } from '../FactoryStore';
import { FactoryProject } from '../types';
import { ArchitecturePanel } from './ArchitecturePanel';
import { ChatPane, StoryStage } from './ChatPane';
import { CodePanel, EXPENSIFY_CODE_FILES } from './CodePanel';
import { CSuiteValidationModal } from './CSuiteValidationModal';
import { CreditPanel } from './CreditPanel';
import { DatabasePanel } from './DatabasePanel';
import { DeploymentPanel } from './DeploymentPanel';
import { GitPanel } from './GitPanel';
import { PlanPanel } from './PlanPanel';
import { PreviewPanel } from './PreviewPanel';
import { TokenConsumptionDrawer } from './TokenConsumptionDrawer';
import { WorkflowPanel } from './WorkflowPanel';

type Tab = 'plan' | 'preview' | 'code' | 'git' | 'database' | 'workflow' | 'deployment' | 'credit';

const ALL_TABS: { id: Tab; label: string; icon: typeof Code }[] = [
  { id: 'plan', label: 'Plan', icon: FileText },
  { id: 'preview', label: 'Preview', icon: Monitor },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'workflow', label: 'Workflow', icon: Layers },
  { id: 'deployment', label: 'Deployment', icon: Cloud },
  { id: 'credit', label: 'Credit & Usage', icon: BarChart3 },
];

/** Shared IDE-style workspace for Full Stack and UI Canvas projects. */
export const BuilderWorkspace: React.FC<{ project: FactoryProject; onBack: () => void }> = ({ project, onBack }) => {
  const f = useFactory();
  const { setCanvasMode } = useNavigation();
  const { toast } = useToast();
  const id = project.projectId;
  const state = f.ws(id);
  const isUi = project.kind === 'ui-canvas';
  const tabs = isUi
    ? ALL_TABS.filter(t => t.id !== 'plan' && t.id !== 'database' && t.id !== 'workflow')
    : ALL_TABS;

  const isStoryApplicable = project.projectName.toLowerCase().includes('expensif') || Object.keys(state.files).length === 0;

  // Story Line State
  const [storyStage, setStoryStage] = useState<StoryStage>(isStoryApplicable ? 'unstarted' : 'completed');
  const [planStep, setPlanStep] = useState<number>(isStoryApplicable ? 0 : 3);
  const [pipeline1Step, setPipeline1Step] = useState<number>(isStoryApplicable ? 0 : 5);
  const [pipeline2Step, setPipeline2Step] = useState<number>(isStoryApplicable ? 0 : 6);
  const [tokensCount, setTokensCount] = useState<number>(isStoryApplicable ? 0 : 101293);

  // Tab & Panes State
  const [tab, setTab] = useState<Tab>(isStoryApplicable ? 'preview' : state.planStatus === 'APPROVED' || isUi ? 'preview' : 'plan');
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tokensOpen, setTokensOpen] = useState(false);
  const [cSuiteOpen, setCSuiteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setCanvasMode(true);
    return () => setCanvasMode(false);
  }, [setCanvasMode]);

  // Timers cleanup ref
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearStoryTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  useEffect(() => {
    return () => clearStoryTimers();
  }, []);

  // 1. User clicks "START APPLICATION GENERATION"
  const handleStartGeneration = () => {
    clearStoryTimers();
    setStoryStage('generating_plan');
    setPlanStep(1); // 1: Fetching context from knowledge graph
    setTokensCount(4200);

    const t1 = setTimeout(() => {
      setPlanStep(2); // 2: Context retrieved, drafting plan based on context
      setTokensCount(8569);
    }, 1200);

    const t2 = setTimeout(() => {
      setPlanStep(3); // 3: Plan drafted and ready
      setStoryStage('plan_ready');
      setTokensCount(14200);
      setTab('plan');
      toast({ title: 'Implementation Plan Drafted', description: 'Review the technical plan in the PLAN tab.' });
    }, 2600);

    timersRef.current.push(t1, t2);
  };

  // 2. User clicks "Proceed to Build"
  const handleProceedToBuild = () => {
    clearStoryTimers();
    setStoryStage('pipeline1_running');
    setPipeline1Step(0);
    setTokensCount(18500);

    const t1 = setTimeout(() => { setPipeline1Step(1); setTokensCount(24000); }, 1100);
    const t2 = setTimeout(() => { setPipeline1Step(2); setTokensCount(32500); }, 2300);
    const t3 = setTimeout(() => { setPipeline1Step(3); setTokensCount(39800); }, 3700);
    const t4 = setTimeout(() => { setPipeline1Step(4); setTokensCount(45000); }, 4900);
    const t5 = setTimeout(() => {
      setPipeline1Step(5);
      setTokensCount(49277);
      setStoryStage('awaiting_db');
      toast({ title: 'Pipeline 1 Complete', description: 'Database cluster connection required to continue.' });
    }, 6200);

    timersRef.current.push(t1, t2, t3, t4, t5);
  };

  // 3. Database credentials given in DatabasePanel -> trigger connection & code generation
  const handleDatabaseConnected = () => {
    clearStoryTimers();
    setStoryStage('pipeline2_running');
    setPipeline2Step(1);
    setTokensCount(58200);

    const t1 = setTimeout(() => {
      setPipeline2Step(2);
      setTokensCount(68000);
    }, 1000);

    const t2 = setTimeout(() => {
      setPipeline2Step(3);
      setTokensCount(79500);
      setTab('code'); // Switch to code tab while code generator is generating
    }, 2400);

    const t3 = setTimeout(() => {
      setPipeline2Step(4);
      setTokensCount(88400);
    }, 4000);

    const t4 = setTimeout(() => {
      setPipeline2Step(5);
      setTokensCount(94200);
    }, 5200);

    const t5 = setTimeout(() => {
      setPipeline2Step(6);
      setTokensCount(101293);
      setStoryStage('completed');
      f.restartPreview(id);
      toast({ title: 'Application Ready!', description: 'Full-stack application preview is live.' });
    }, 6600);

    timersRef.current.push(t1, t2, t3, t4, t5);
  };

  // 4. Reset Story (Replay Walkthrough)
  const handleResetStory = () => {
    clearStoryTimers();
    setStoryStage('unstarted');
    setPlanStep(0);
    setPipeline1Step(0);
    setPipeline2Step(0);
    setTokensCount(0);
    setShowArchitecture(false);
    setTab('preview');
    toast({ title: 'Story Reset', description: 'Generation walkthrough returned to initial state.' });
  };

  const isCodeAvailable = pipeline2Step >= 3 || storyStage === 'completed';
  const effectiveFiles = isCodeAvailable
    ? { ...EXPENSIFY_CODE_FILES, ...state.files }
    : state.files;
  const fileCount = Object.keys(effectiveFiles).length;
  const isPreviewLive = storyStage === 'completed';

  const status =
    storyStage === 'unstarted'
      ? { label: 'Ready', cls: 'text-slate-400', dot: 'bg-slate-400' }
      : storyStage === 'generating_plan'
      ? { label: 'Drafting Plan', cls: 'text-indigo-600', dot: 'bg-indigo-500 animate-ping' }
      : storyStage === 'plan_ready'
      ? { label: 'Plan Ready', cls: 'text-indigo-600', dot: 'bg-indigo-500' }
      : storyStage === 'pipeline1_running'
      ? { label: 'Building', cls: 'text-amber-500', dot: 'bg-amber-400 animate-ping' }
      : storyStage === 'awaiting_db'
      ? { label: 'Action Required', cls: 'text-amber-600', dot: 'bg-amber-500' }
      : storyStage === 'pipeline2_running'
      ? { label: 'Synthesizing', cls: 'text-purple-600', dot: 'bg-purple-500 animate-ping' }
      : { label: 'Live', cls: 'text-emerald-600', dot: 'bg-emerald-500' };

  const handleTabClick = (t: Tab) => {
    setShowArchitecture(false);
    setTab(t);
  };

  const exportProject = () => {
    if (!fileCount) return toast({ title: 'No code files to export yet', description: 'Build something first!', tone: 'error' });
    const url = URL.createObjectURL(new Blob([JSON.stringify(effectiveFiles, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.projectName.replace(/\s+/g, '-').toLowerCase()}-files.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${fileCount} files downloaded as a JSON bundle (prototype export).` });
  };



  // Pass previewReady depending on story stage
  const effectiveState = {
    ...state,
    files: effectiveFiles,
    previewReady: isPreviewLive,
  };

  return (
    <div className="h-full w-full flex bg-[#F8FAFC]">
      {/* Left Chat & Execution Logs Pane */}
      {!expanded && (
        <div className="w-[33%] min-w-[340px] max-w-[480px] shrink-0 border-r border-slate-200 bg-white">
          <ChatPane
            projectName={project.projectName}
            state={effectiveState}
            storyStage={storyStage}
            planStep={planStep}
            pipeline1Step={pipeline1Step}
            pipeline2Step={pipeline2Step}
            tokensCount={tokensCount}
            placeholder={isUi ? 'Describe the page or change you want…' : 'Describe what you want to build…'}
            onStartGeneration={handleStartGeneration}
            onProceedToBuild={handleProceedToBuild}
            onConnectDatabase={() => {
              setShowArchitecture(false);
              setTab('database');
            }}
            onResetStory={handleResetStory}
            onBack={onBack}
            onSend={t => f.send(id, t)}
            onStop={() => f.stop(id)}
            onJumpToFile={file => {
              f.setActiveFile(id, file);
              setShowArchitecture(false);
              setTab('code');
            }}
            onOpenPlan={() => {
              setShowArchitecture(false);
              setTab('plan');
            }}
            onOpenTokens={() => setTokensOpen(true)}
            onViewArchitecture={() => setShowArchitecture(true)}
            onOpenDatabase={() => {
              setShowArchitecture(false);
              setTab('database');
            }}
            suggestions={[]}
            prompts={[]}
          />
        </div>
      )}

      {/* Right Workspace Pane */}
      <div className="flex-1 min-w-0 flex flex-col bg-white">
        {/* Workspace Top Tabs Header */}
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:px-4">
          <div className="flex items-center gap-3 min-w-0 overflow-x-auto">
            <div className="flex shrink-0 rounded-full bg-slate-100/90 p-1 border border-slate-200">
              {tabs.map(t => {
                const I = t.icon;
                const isActive = !showArchitecture && tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(t.id)}
                    className={cx(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer',
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-[#0F172A] hover:bg-white/60'
                    )}
                  >
                    <I className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
            <span
              className={cx(
                'hidden xl:flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider shrink-0',
                status.cls,
                status.label === 'Live'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50'
              )}
            >
              <span className={cx('w-1.5 h-1.5 rounded-full', status.dot)} />
              {status.label}
            </span>

            {isPreviewLive && (
              <button
                onClick={() => setCSuiteOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 text-[11px] font-bold uppercase tracking-wider shrink-0 transition cursor-pointer animate-fade-in"
              >
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>C-SUITE VALIDATION</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setExpanded(e => !e)}
              title={expanded ? 'Show chat' : 'Expand workspace'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition"
            >
              {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <Button
              size="sm"
              icon={<Share2 className="w-3.5 h-3.5" />}
              className="hidden md:inline-flex !bg-emerald-50 !text-emerald-700 !border-emerald-200 hover:!bg-emerald-100"
              onClick={() => setShareOpen(true)}
            >
              Share
            </Button>
            <Button size="sm" variant="dark" icon={<Download className="w-3.5 h-3.5" />} onClick={exportProject}>
              Export
            </Button>
          </div>
        </div>

        {/* Workspace Active Panel Content */}
        <div className="flex-1 min-h-0 overflow-hidden bg-[#F9F9F8]">
          {showArchitecture ? (
            <ArchitecturePanel projectName={project.projectName} onClose={() => setShowArchitecture(false)} />
          ) : (
            <>
              {tab === 'plan' && !isUi && (
                <div className="h-full overflow-hidden p-2 lg:p-4">
                  <PlanPanel
                    projectId={id}
                    state={effectiveState}
                    canProceed={storyStage === 'plan_ready'}
                    isPlanReady={storyStage !== 'unstarted' && storyStage !== 'generating_plan'}
                    onSubmitClarifications={a => f.submitClarifications(id, a)}
                    onProceed={handleProceedToBuild}
                  />
                </div>
              )}
              {tab === 'preview' && (
                <div className="h-full overflow-hidden">
                  <PreviewPanel
                    appName={project.projectName}
                    state={effectiveState}
                    onRefresh={() => f.restartPreview(id)}
                    onPage={p => f.setPage(id, p)}
                  />
                </div>
              )}
              {tab === 'code' && (
                <div className="h-full overflow-hidden p-2 lg:p-4">
                  <CodePanel
                    state={effectiveState}
                    isCodeWriterActive={pipeline2Step >= 3 || storyStage === 'completed'}
                    onPick={file => f.setActiveFile(id, file)}
                    onSave={(file, content) => {
                      f.saveFile(id, file, content);
                      toast({ title: 'File saved', description: file });
                    }}
                  />
                </div>
              )}
              {tab === 'git' && (
                <div className="h-full overflow-hidden p-2 lg:p-4">
                  <GitPanel
                    projectName={project.projectName}
                    state={effectiveState}
                    hasFiles={fileCount > 0}
                    onConnect={() => f.connectGithub(id)}
                    onDisconnect={() => f.disconnectGithub(id)}
                    onPublish={o => f.publishRepo(id, o)}
                    onDeleteRepo={() => f.deleteRepo(id)}
                    onCommit={m => f.commit(id, m)}
                  />
                </div>
              )}
              {tab === 'database' && !isUi && (
                <div className="h-full overflow-hidden">
                  <DatabasePanel
                    connected={storyStage === 'pipeline2_running' || storyStage === 'completed'}
                    onConnect={handleDatabaseConnected}
                    projectName={project.projectName}
                  />
                </div>
              )}
              {tab === 'workflow' && !isUi && (
                <div className="h-full overflow-hidden">
                  <WorkflowPanel
                    projectName={project.projectName}
                    isWorkflowReady={
                      pipeline1Step >= 3 ||
                      storyStage === 'awaiting_db' ||
                      storyStage === 'pipeline2_running' ||
                      storyStage === 'completed'
                    }
                  />
                </div>
              )}
              {tab === 'deployment' && (
                <div className="h-full overflow-hidden">
                  <DeploymentPanel
                    projectId={id}
                    projectName={project.projectName}
                    state={effectiveState}
                    hasFiles={fileCount > 0}
                    onDeploy={(p, n) => f.deploy(id, p, n)}
                    onStop={d => f.stopDeployment(id, d)}
                    onPublicLink={on => f.togglePublicLink(id, on)}
                    onOpenGit={() => setTab('git')}
                  />
                </div>
              )}
              {tab === 'credit' && (
                <div className="h-full overflow-hidden">
                  <CreditPanel />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Drawers & Dialogs */}
      <TokenConsumptionDrawer open={tokensOpen} onClose={() => setTokensOpen(false)} tokensCount={tokensCount} />
      <CSuiteValidationModal
        open={cSuiteOpen}
        projectName={project.projectName}
        onClose={() => setCSuiteOpen(false)}
      />
      <Dialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Share project"
        subtitle="Control who can view the live application."
        width="max-w-md"
        footer={<Button onClick={() => setShareOpen(false)}>Done</Button>}
      >
        <div className="space-y-4">
          <Toggle
            checked={state.publicLink}
            onChange={on => f.togglePublicLink(id, on)}
            label={state.publicLink ? 'Anyone with the link can view' : 'Private — only you'}
          />
          {state.publicLink && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <code className="text-[13.5px] font-mono text-slate-600 truncate">{`${location.origin}/share/${id}`}</code>
              <Button
                size="xs"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`${location.origin}/share/${id}`);
                  } catch {
                    /* ignore */
                  }
                  toast({ title: 'Link copied' });
                }}
              >
                Copy
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};
