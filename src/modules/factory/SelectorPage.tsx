import React from 'react';
import { ArrowRight, ArrowRightLeft, ClipboardList, Layers, Plus, Zap } from 'lucide-react';
import { Button, Crumbs, useToast, cx } from '../ui';
import { FactoryKind } from './types';
import { useFactory } from './FactoryStore';

interface Props {
  onPick: (kind: FactoryKind) => void;
}

const OPTIONS: { kind: FactoryKind; title: string; description: string; icon: typeof Layers; tint: string; icon_bg: string; icon_fg: string; bar: string }[] = [
  { kind: 'ui-canvas', title: 'Frontend Creator / UI Canvas', description: 'Create and customize high-fidelity user interface pages using our interactive generative UI builder.', icon: Zap, tint: 'from-emerald-500/10 via-teal-500/5', icon_bg: 'bg-emerald-50', icon_fg: 'text-emerald-600', bar: 'bg-emerald-500' },
  { kind: 'code-migration', title: 'Code migration — migrate your code', description: 'Automate the transition of legacy systems to modern cloud-native architectures.', icon: ArrowRightLeft, tint: 'from-blue-500/10 via-indigo-500/5', icon_bg: 'bg-blue-50', icon_fg: 'text-[#2563EB]', bar: 'bg-[#2563EB]' },
  { kind: 'full-stack', title: 'Create Full stack app', description: 'Build robust, scalable full-stack applications with integrated backend and UI components.', icon: Layers, tint: 'from-purple-500/10 via-pink-500/5', icon_bg: 'bg-purple-50', icon_fg: 'text-purple-600', bar: 'bg-purple-500' },
  { kind: 'planner-app', title: 'Create application from solution planner', description: 'Execute existing strategic roadmaps and launch autonomous building sequences.', icon: ClipboardList, tint: 'from-amber-500/10 via-orange-500/5', icon_bg: 'bg-amber-50', icon_fg: 'text-amber-600', bar: 'bg-amber-500' },
];

export const SelectorPage: React.FC<Props> = ({ onPick }) => {
  const { toast } = useToast();
  const { projects } = useFactory();
  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="pointer-events-none absolute -top-10 -left-10 w-[45%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-[45%] h-[40%] rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <Crumbs items={[{ label: 'Dashboard' }, { label: 'Solution Factory' }]} />
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Solution Factory</h1>
            <p className="text-[15px] text-[#64748B] mt-1">{projects.length} projects across all execution paths</p>
          </div>
          <Button variant="dark" icon={<Plus className="w-4 h-4" />} onClick={() => toast({ title: 'Module selection', description: 'Please choose a workflow below to start a new solution.', tone: 'info' })}>New Solution</Button>
        </div>

        <div className="text-center my-12 space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Choose Your <span className="bg-gradient-to-r from-[#2563EB] to-indigo-500 bg-clip-text text-transparent">Execution Path</span>
          </h2>
          <p className="max-w-xl mx-auto text-[19px] text-[#64748B] leading-relaxed">Select the orchestration module that aligns with your architectural goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
          {OPTIONS.map(o => {
            const Icon = o.icon;
            const count = projects.filter(p => p.kind === o.kind).length;
            return (
              <button key={o.kind} onClick={() => onPick(o.kind)} className="group relative text-left cursor-pointer">
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-subtle transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-modal group-hover:border-slate-300">
                  <div className={cx('absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500', o.tint)} />
                  <div className={cx('relative mb-8 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110', o.icon_bg)}>
                    <Icon className={cx('w-7 h-7', o.icon_fg)} />
                  </div>
                  <div className="relative flex flex-col flex-1">
                    <h3 className="text-[19px] font-bold text-[#0F172A] mb-3 leading-snug">{o.title}</h3>
                    <p className="text-[15px] text-[#64748B] leading-relaxed flex-1 mb-8">{o.description}</p>
                    <div className="flex items-center justify-between text-[12.5px] font-bold uppercase tracking-[0.18em] text-slate-400 group-hover:text-[#0F172A] transition-colors">
                      <span className="flex items-center gap-2">Start building <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></span>
                      <span className="normal-case tracking-normal font-semibold text-slate-400">{count} project{count === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                  <div className={cx('absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100', o.bar)} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
