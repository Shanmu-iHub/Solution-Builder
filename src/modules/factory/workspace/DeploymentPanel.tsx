import React, { useState } from 'react';
import { CheckCircle2, Cloud, Copy, ExternalLink, Globe, Link2, Loader2, Lock, Rocket, ShieldCheck, Square } from 'lucide-react';
import { Badge, Button, Card, Field, Input, SectionLabel, Toggle, cx, sleep, timeAgo, useToast } from '../../ui';
import { WorkspaceState } from '../types';

interface Props {
  projectId: string;
  projectName: string;
  state: WorkspaceState;
  hasFiles: boolean;
  onDeploy: (provider: string, name: string) => Promise<unknown>;
  onStop: (id: string) => void;
  onPublicLink: (on: boolean) => void;
  onOpenGit: () => void;
}

const PROVIDERS = [
  { id: 'Cloudflare Pages', desc: 'Global edge network, instant rollbacks', tag: 'Recommended' },
  { id: 'Vercel', desc: 'Optimised for Next.js frameworks', tag: '' },
  { id: 'Netlify', desc: 'Git-based continuous deployment', tag: '' },
];
const STAGES = ['Packaging assets', 'Uploading build', 'Provisioning edge routes', 'Issuing SSL certificate', 'Going live'];

export const DeploymentPanel: React.FC<Props> = ({ projectId, projectName, state, hasFiles, onDeploy, onStop, onPublicLink, onOpenGit }) => {
  const { toast } = useToast();
  const [provider, setProvider] = useState(PROVIDERS[0].id);
  const [name, setName] = useState(projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  const [domain, setDomain] = useState('portal.acme-demo.com');
  const [stage, setStage] = useState(-1);
  const live = state.deployments.find(d => d.status === 'live');
  const deploying = stage >= 0;
  const shareUrl = `${location.origin}/share/${projectId}`;

  const launch = async () => {
    if (!hasFiles) return toast({ title: 'Nothing to deploy', description: 'Build the application first.', tone: 'error' });
    if (!name.trim()) return toast({ title: 'Missing required fields', description: 'Enter a project name.', tone: 'error' });
    for (let i = 0; i < STAGES.length; i++) { setStage(i); await sleep(650); }
    const rec = (await onDeploy(provider, name.trim())) as { url: string };
    setStage(-1);
    toast({ title: 'Production deployment active', description: rec.url });
  };

  return (
    <div className="h-full overflow-auto rounded-2xl border border-slate-200 bg-slate-50/40 p-6">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          <Card className="space-y-4">
            <div>
              <h3 className="text-[17px] font-bold text-[#0F172A] flex items-center gap-2"><Rocket className="w-4 h-4 text-[#2563EB]" /> Deploy &amp; share application</h3>
              <p className="text-[13.5px] text-slate-500 mt-0.5">Choose how you want to deploy or share your application.</p>
            </div>
            {!state.git.repoUrl && <div className="flex items-center justify-between gap-3 text-[13.5px] bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3 py-2"><span>Tip: publish to GitHub first for continuous deployment.</span><button onClick={onOpenGit} className="font-bold underline cursor-pointer">Open Git</button></div>}
            <div>
              <SectionLabel>Select cloud provider</SectionLabel>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {PROVIDERS.map(p => (
                  <button key={p.id} onClick={() => setProvider(p.id)} disabled={deploying} className={cx('text-left p-3 rounded-xl border transition cursor-pointer', provider === p.id ? 'border-[#2563EB] bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-slate-300')}>
                    <span className="flex items-center gap-2 text-[13.5px] font-bold text-[#0F172A]"><Cloud className="w-3.5 h-3.5" />{p.id}</span>
                    <span className="block text-[12.5px] text-slate-500 mt-1 leading-snug">{p.desc}</span>
                    {p.tag && <Badge tone="green" className="mt-2">{p.tag}</Badge>}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Project name" hint="This will be used for your application URL."><Input value={name} onChange={e => setName(e.target.value)} disabled={deploying} /></Field>
              <Field label="Custom domain (optional)"><Input value={domain} onChange={e => setDomain(e.target.value)} placeholder="app.example.com" disabled={deploying} /></Field>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="green"><CheckCircle2 className="w-3 h-3" />Verified token</Badge>
              <Badge tone={hasFiles ? 'green' : 'amber'}>{hasFiles ? 'Assets packaged' : 'Awaiting build'}</Badge>
              <Badge><Globe className="w-3 h-3" />Global anycast</Badge>
            </div>
            <Button variant="primary" loading={deploying} disabled={deploying} icon={<Rocket className="w-4 h-4" />} onClick={launch}>{deploying ? 'Deploying application…' : 'Launch site'}</Button>
            {deploying && (
              <div className="space-y-1.5 animate-fade-in">
                {STAGES.map((s, i) => (
                  <div key={s} className={cx('flex items-center gap-2 text-[13.5px]', i <= stage ? 'text-[#0F172A]' : 'text-slate-300')}>
                    {i < stage ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : i === stage ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-200" />}{s}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {live && (
            <Card className="border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-bold text-emerald-800 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Production deployment active</p>
                <Badge tone="green">{live.provider}</Badge>
              </div>
              <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-xl px-3 py-2">
                <Globe className="w-4 h-4 text-emerald-600" /><a href={live.url} target="_blank" rel="noreferrer" className="text-[15px] font-mono text-[#1D4ED8] truncate hover:underline">{live.url}</a>
                <button onClick={async () => { try { await navigator.clipboard.writeText(live.url); } catch { /* ignore */ } toast({ title: 'Copied!', description: 'Link copied to clipboard.' }); }} className="ml-auto text-slate-400 hover:text-slate-700 cursor-pointer"><Copy className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-2"><Button size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />} onClick={() => window.open(live.url, '_blank')}>Visit site</Button><Button size="sm" variant="danger" icon={<Square className="w-3.5 h-3.5" />} onClick={() => { onStop(live.id); toast({ title: 'Deployment removed' }); }}>Stop service</Button></div>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card className="space-y-3">
            <SectionLabel icon={<Link2 className="w-3.5 h-3.5" />}>Public link access</SectionLabel>
            <Toggle checked={state.publicLink} onChange={on => { onPublicLink(on); toast({ title: on ? 'Public link activated' : 'Private access enabled', description: on ? 'Anyone with the link can now view your live UI.' : 'The shareable link has been deactivated.' }); }} label={state.publicLink ? 'Anyone with the link' : 'Private only'} />
            {state.publicLink && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <code className="text-[12.5px] font-mono text-slate-600 truncate">{shareUrl}</code>
                <button onClick={async () => { try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ } toast({ title: 'Copied!' }); }} className="ml-auto text-slate-400 hover:text-slate-700 cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </Card>
          <Card className="space-y-2.5">
            <SectionLabel>Activity stream</SectionLabel>
            {state.deployments.length === 0 ? <p className="text-[13.5px] text-slate-400">No deployments yet.</p> : state.deployments.map(d => (
              <div key={d.id} className="flex items-start gap-2.5 text-[13.5px]">
                <span className={cx('mt-1 w-2 h-2 rounded-full shrink-0', d.status === 'live' ? 'bg-emerald-500' : 'bg-slate-300')} />
                <div className="min-w-0"><p className="font-semibold text-[#0F172A]">{d.provider} · {d.status === 'live' ? 'Live' : 'Stopped'}</p><p className="font-mono text-slate-400 truncate">{d.url}</p><p className="text-slate-400">{timeAgo(d.at)}</p></div>
              </div>
            ))}
          </Card>
          <p className="flex items-start gap-2 text-[12.5px] text-slate-400 leading-relaxed"><Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>SSL certificate: <b className="text-slate-500">TLS 1.3 active</b>. All deployments and links are secure and encrypted. <ShieldCheck className="w-3 h-3 inline" /></span></p>
        </div>
      </div>
    </div>
  );
};
