import React, { useMemo, useState } from 'react';
import { ExternalLink, Loader2, Monitor, Moon, PowerOff, RefreshCw, Smartphone, Sun, Tablet } from 'lucide-react';
import { Button, cx } from '../../ui';
import { previewHtml } from '../mockData';
import { WorkspaceState } from '../types';

interface Props {
  appName: string;
  state: WorkspaceState;
  onRefresh: () => void;
  onPage: (page: string) => void;
}

const DEVICES = { desktop: { w: '100%', icon: Monitor }, tablet: { w: '768px', icon: Tablet }, mobile: { w: '390px', icon: Smartphone } } as const;

export const PreviewPanel: React.FC<Props> = ({ appName, state, onRefresh, onPage }) => {
  const [device, setDevice] = useState<keyof typeof DEVICES>('desktop');
  const [dark, setDark] = useState(false);
  const html = useMemo(() => previewHtml(appName, state.activePage, dark), [appName, state.activePage, dark, state.previewRevision]); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 bg-slate-50/70">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-slate-500">
            <Monitor className="w-3.5 h-3.5" /> Live app preview
          </span>
        </div>
        <div className="flex items-center gap-1">
          {(Object.keys(DEVICES) as (keyof typeof DEVICES)[]).map(d => {
            const I = DEVICES[d].icon;
            return <button key={d} onClick={() => setDevice(d)} title={d} className={cx('p-1.5 rounded-lg cursor-pointer', device === d ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-400 hover:bg-slate-100')}><I className="w-4 h-4" /></button>;
          })}
          <span className="w-px h-4 bg-slate-200 mx-1" />
          <button onClick={() => setDark(d => !d)} title="Toggle theme mode preview" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer">{dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
          <button onClick={onRefresh} title="Refresh preview" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={openNew} disabled={!state.previewReady} title="Open in new tab" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"><ExternalLink className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 bg-slate-100 flex justify-center overflow-auto p-0 md:p-4">
        {!state.previewReady ? (
          <div className="m-auto text-center max-w-md px-6 py-12">
            {state.generating ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-[#2563EB] mx-auto mb-3" />
                <p className="text-[15px] font-bold text-[#0F172A]">Building your application…</p>
                <p className="text-[13.5px] text-slate-500 mt-1">The preview appears here as soon as the dev server is up.</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-50/80 text-indigo-500 border border-indigo-100 flex items-center justify-center mx-auto mb-4 shadow-2xs">
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-2">Live App Preview</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Describe what you want to build in the chat panel. The AI builder will generate your Next.js application and launch an interactive preview canvas here.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className={cx('h-full bg-white shadow-card transition-all duration-300 overflow-hidden', device === 'desktop' ? 'w-full md:rounded-lg' : 'rounded-2xl border border-slate-300')} style={{ width: DEVICES[device].w, maxWidth: '100%' }}>
            <iframe key={`${state.previewRevision}-${state.activePage}-${dark}`} title="Live preview" srcDoc={html} sandbox="" className="w-full h-full border-0 bg-white" />
          </div>
        )}
        {state.generating && state.previewReady && <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#0F172A] text-white text-[12.5px] px-3 py-1.5 rounded-full shadow-modal"><Loader2 className="w-3 h-3 animate-spin" /> Updating…</div>}
      </div>
    </div>
  );
};
