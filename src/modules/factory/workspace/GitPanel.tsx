import React, { useState } from 'react';
import { ExternalLink, GitBranch, GitCommit, RefreshCw, ShieldCheck, Trash2, Unplug } from 'lucide-react';
import { Badge, Button, Card, ConfirmDialog, Field, Input, SectionLabel, Select, Textarea, timeAgo, useToast, GithubIcon as Github } from '../../ui';
import { WorkspaceState } from '../types';

interface Props {
  projectName: string;
  state: WorkspaceState;
  hasFiles: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onPublish: (o: { repoName: string; description: string; visibility: string }) => Promise<void>;
  onDeleteRepo: () => void;
  onCommit: (message: string) => void;
}

export const GitPanel: React.FC<Props> = ({ projectName, state, hasFiles, onConnect, onDisconnect, onPublish, onDeleteRepo, onCommit }) => {
  const { toast } = useToast();
  const g = state.git;
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  const [description, setDescription] = useState('Generated with Solution Factory — Next.js 15, Prisma and PostgreSQL.');
  const [visibility, setVisibility] = useState('private');
  const [license, setLicense] = useState('none');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('feat: add monthly spend chart and CSV export');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const publish = async () => {
    if (!hasFiles) return toast({ title: 'Nothing to publish', description: 'Build something first.', tone: 'error' });
    setPublishing(true);
    await onPublish({ repoName, description, visibility });
    setPublishing(false);
    toast({ title: 'Published to GitHub', description: `${g.account}/${repoName}` });
  };

  return (
    <div className="h-full overflow-auto rounded-2xl border border-slate-200 bg-slate-50/40 p-6">
      <div className="max-w-3xl mx-auto space-y-5">
        <Card className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0"><Github className="w-5 h-5" /></div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#0F172A]">{g.connected ? 'Connected to GitHub' : 'Connect GitHub'}</p>
              <p className="text-[13.5px] text-slate-500">{g.connected ? <>GitHub Account <b className="text-slate-700">{g.account}</b></> : 'Authorize access to publish this project to a repository.'}</p>
            </div>
          </div>
          {g.connected ? <Button icon={<Unplug className="w-4 h-4" />} onClick={onDisconnect}>Disconnect GitHub</Button> : <Button variant="dark" icon={<Github className="w-4 h-4" />} onClick={() => { onConnect(); toast({ title: 'GitHub connected' }); }}>Connect GitHub</Button>}
        </Card>
        {!g.connected && <p className="text-[13.5px] text-slate-400 text-center flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> We only access the repositories you authorize. Your code is safe and secure.</p>}

        {g.connected && !g.repoUrl && (
          <Card className="space-y-4">
            <SectionLabel icon={<GitBranch className="w-3.5 h-3.5" />}>Publish to a new repository</SectionLabel>
            <Field label="Repository name" hint="A unique name for your repository."><Input value={repoName} onChange={e => setRepoName(e.target.value)} /></Field>
            <Field label="Description (optional)" hint="A short description of your project."><Textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} /></Field>
            <button onClick={() => setShowAdvanced(s => !s)} className="text-[13.5px] font-semibold text-[#2563EB] cursor-pointer">{showAdvanced ? 'Hide' : 'Show'} advanced settings (optional)</button>
            {showAdvanced && (
              <div className="grid grid-cols-2 gap-4">
                <Field label="Repository visibility"><Select value={visibility} onChange={e => setVisibility(e.target.value)}><option value="private">Private</option><option value="public">Public</option></Select></Field>
                <Field label="License" hint="Select an open source license."><Select value={license} onChange={e => setLicense(e.target.value)}><option value="none">None</option><option value="mit">MIT License</option><option value="apache">Apache 2.0</option><option value="gpl">GNU GPLv3</option></Select></Field>
              </div>
            )}
            <Button variant="primary" loading={publishing} disabled={!repoName.trim()} icon={<Github className="w-4 h-4" />} onClick={publish}>{publishing ? 'Publishing code…' : 'Publish to GitHub'}</Button>
          </Card>
        )}

        {g.connected && g.repoUrl && (
          <>
            <Card className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <SectionLabel icon={<GitBranch className="w-3.5 h-3.5" />}>Repository status</SectionLabel>
                <div className="flex items-center gap-1.5">
                  <Button size="xs" icon={<RefreshCw className="w-3 h-3" />} onClick={() => toast({ title: 'Status refreshed' })}>Refresh</Button>
                  <a href={g.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#2563EB] px-2 py-1 hover:underline"><ExternalLink className="w-3 h-3" /> View on GitHub</a>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[15px] font-semibold text-[#0F172A]">{g.account}/{g.repoName}</span>
                <Badge tone="green" dot>Synced</Badge>
                <Badge mono><GitBranch className="w-3 h-3" />{g.branch}</Badge>
              </div>
              <div className="flex gap-2">
                <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Commit message…" onKeyDown={e => { if (e.key === 'Enter' && message.trim()) { onCommit(message.trim()); setMessage(''); toast({ title: 'Committed & pushed' }); } }} />
                <Button variant="dark" disabled={!message.trim()} icon={<GitCommit className="w-4 h-4" />} onClick={() => { onCommit(message.trim()); setMessage(''); toast({ title: 'Committed & pushed' }); }}>Commit</Button>
              </div>
            </Card>
            <Card padded={false} className="overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100"><SectionLabel>Recent commits</SectionLabel></div>
              {g.commits.map(c => (
                <div key={c.hash} className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3 min-w-0"><GitCommit className="w-4 h-4 text-slate-400 shrink-0" /><span className="text-[14.5px] text-[#0F172A] truncate">{c.message}</span></div>
                  <div className="flex items-center gap-3 shrink-0"><code className="text-[12.5px] font-mono text-slate-400">{c.hash}</code><span className="text-[12.5px] text-slate-400">{timeAgo(c.at)}</span></div>
                </div>
              ))}
            </Card>
            <Card className="border-rose-200 space-y-2">
              <p className="text-[12.5px] font-bold text-rose-600 uppercase tracking-wider">Danger zone</p>
              <p className="text-[13.5px] text-slate-500">Permanently delete this repository from GitHub. This action cannot be undone.</p>
              <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={() => setConfirmDelete(true)}>Delete repository</Button>
            </Card>
          </>
        )}
      </div>
      <ConfirmDialog open={confirmDelete} danger title="Delete repository?" description={`${g.account}/${g.repoName} will be permanently deleted from GitHub.`} confirmText="Confirm delete" onClose={() => setConfirmDelete(false)} onConfirm={() => { onDeleteRepo(); toast({ title: 'Repository deleted' }); }} />
    </div>
  );
};
