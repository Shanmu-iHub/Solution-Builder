import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus, X, Maximize2 } from 'lucide-react';
import { cx } from '../ui';
import { MapEdge, MapNode } from './types';

const PALETTE = ['#2563EB', '#0EA5E9', '#14B8A6', '#8B5CF6', '#F59E0B', '#EC4899', '#64748B', '#10B981', '#EF4444'];
export const colorForType = (type: string) => {
  let h = 0;
  for (const c of type) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
};
export const HIGHLIGHT = '#F59E0B';

interface P3 { x: number; y: number; z: number }

/** Small force-directed layout (repulsion + springs + gravity), run once per graph. */
const layout = (nodes: MapNode[], edges: MapEdge[]): Record<string, P3> => {
  const pos: Record<string, P3> = {};
  nodes.forEach((n, i) => {
    const a = (i / Math.max(1, nodes.length)) * Math.PI * 2;
    const r = 120 + (i % 5) * 28;
    pos[n.id] = { x: Math.cos(a) * r, y: Math.sin(a) * r, z: ((i * 37) % 200) - 100 };
  });
  const ids = nodes.map(n => n.id);
  for (let it = 0; it < 260; it++) {
    const cool = 1 - it / 260;
    const force: Record<string, P3> = {};
    ids.forEach(id => (force[id] = { x: 0, y: 0, z: 0 }));
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = pos[ids[i]], b = pos[ids[j]];
        let dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d2 = dx * dx + dy * dy + dz * dz + 0.01;
        const f = 16000 / d2;
        const d = Math.sqrt(d2);
        dx /= d; dy /= d; dz /= d;
        force[ids[i]].x += dx * f; force[ids[i]].y += dy * f; force[ids[i]].z += dz * f;
        force[ids[j]].x -= dx * f; force[ids[j]].y -= dy * f; force[ids[j]].z -= dz * f;
      }
    }
    edges.forEach(e => {
      const a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01;
      const f = (d - 130) * 0.035;
      force[e.source].x += (dx / d) * f; force[e.source].y += (dy / d) * f; force[e.source].z += (dz / d) * f;
      force[e.target].x -= (dx / d) * f; force[e.target].y -= (dy / d) * f; force[e.target].z -= (dz / d) * f;
    });
    ids.forEach(id => {
      const p = pos[id], f = force[id];
      p.x += (f.x - p.x * 0.012) * 0.55 * cool; p.y += (f.y - p.y * 0.012) * 0.55 * cool; p.z += (f.z - p.z * 0.012) * 0.55 * cool;
    });
  }
  return pos;
};

interface Props {
  nodes: MapNode[];
  edges: MapEdge[];
  highlightIds?: ReadonlySet<string>;
  className?: string;
}

export const GraphCanvas: React.FC<Props> = ({ nodes, edges, highlightIds, className }) => {
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState({ y: 0, x: 0.35 });
  const [spin, setSpin] = useState(true);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const positions = useMemo(() => layout(nodes, edges), [nodes, edges]);
  const byId = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);
  const sel = selected ? byId.get(selected) || null : null;

  useEffect(() => {
    if (mode !== '3d' || !spin) return;
    let raf = 0;
    const tick = () => {
      setAngle(a => ({ ...a, y: a.y + 0.004 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, spin]);

  useEffect(() => { if (selected && !byId.has(selected)) setSelected(null); }, [byId, selected]);

  const project = (id: string) => {
    const p = positions[id];
    if (!p) return { x: 0, y: 0, s: 1, z: 0 };
    if (mode === '2d') return { x: p.x, y: p.y, s: 1, z: 0 };
    const cy = Math.cos(angle.y), sy = Math.sin(angle.y), cx_ = Math.cos(angle.x), sx = Math.sin(angle.x);
    const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
    const y2 = p.y * cx_ - z1 * sx, z2 = p.y * sx + z1 * cx_;
    const s = 420 / (420 + z2);
    return { x: x1 * s, y: y2 * s, s, z: z2 };
  };

  const proj = useMemo(() => new Map(nodes.map(n => [n.id, project(n.id)])), [nodes, positions, mode, angle]); // eslint-disable-line react-hooks/exhaustive-deps
  const order = [...nodes].sort((a, b) => (proj.get(b.id)!.z - proj.get(a.id)!.z));
  const typeSet = [...new Set(nodes.map(n => n.type))];

  const neighbours = useMemo(() => {
    if (!selected) return new Set<string>();
    const s = new Set<string>([selected]);
    edges.forEach(e => { if (e.source === selected) s.add(e.target); if (e.target === selected) s.add(e.source); });
    return s;
  }, [selected, edges]);

  const connections = selected
    ? [
        ...edges.filter(e => e.source === selected).map(e => ({ label: `${e.type} ${byId.get(e.target)?.label ?? e.target}`, dir: '→' })),
        ...edges.filter(e => e.target === selected).map(e => ({ label: `${byId.get(e.source)?.label ?? e.source} ${e.type}`, dir: '←' })),
      ]
    : [];

  return (
    <div className={cx('relative w-full h-full min-h-[320px] bg-[radial-gradient(circle_at_center,#F8FAFC,#fff)] select-none', className)}>
      <div className="absolute top-3 left-3 z-10 flex items-center gap-3 text-[13.5px] bg-white/90 backdrop-blur border border-slate-200 rounded-xl px-3 py-1.5 shadow-subtle">
        <span><strong className="text-[#0F172A]">{nodes.length}</strong> entities</span>
        <span><strong className="text-[#0F172A]">{edges.length}</strong> relationships</span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-white shadow-subtle" role="tablist">
          {(['2d', '3d'] as const).map(m => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setPan({ x: 0, y: 0 }); setZoom(1); }} className={cx('px-3 py-1.5 text-[13.5px] font-semibold uppercase cursor-pointer', mode === m ? 'bg-[#0F172A] text-white' : 'text-slate-600 hover:bg-slate-50')}>{m}</button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[60%]">
        {typeSet.map(t => (
          <span key={t} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold bg-white/90 border border-slate-200 rounded-full px-2 py-0.5 text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ background: colorForType(t) }} />{t}
          </span>
        ))}
      </div>

      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1">
        {[{ i: <Plus className="w-3.5 h-3.5" />, f: () => setZoom(z => Math.min(3, z * 1.2)) }, { i: <Minus className="w-3.5 h-3.5" />, f: () => setZoom(z => Math.max(0.4, z / 1.2)) }, { i: <Maximize2 className="w-3.5 h-3.5" />, f: () => { setZoom(1); setPan({ x: 0, y: 0 }); } }].map((b, i) => (
          <button key={i} onClick={b.f} className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-subtle text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer">{b.i}</button>
        ))}
        {mode === '3d' && <button onClick={() => setSpin(s => !s)} className="h-8 px-2 rounded-lg bg-white border border-slate-200 shadow-subtle text-[11.5px] font-bold text-slate-600 cursor-pointer">{spin ? 'PAUSE' : 'SPIN'}</button>}
      </div>

      <svg
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        viewBox="-400 -300 800 600"
        onWheel={e => setZoom(z => Math.max(0.4, Math.min(3, z * (e.deltaY < 0 ? 1.08 : 0.92))))}
        onMouseDown={e => { drag.current = { x: e.clientX, y: e.clientY, moved: false }; }}
        onMouseMove={e => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
          if (Math.abs(dx) + Math.abs(dy) > 2) drag.current.moved = true;
          drag.current = { ...drag.current, x: e.clientX, y: e.clientY };
          if (mode === '3d') { setSpin(false); setAngle(a => ({ y: a.y + dx * 0.008, x: Math.max(-1.2, Math.min(1.2, a.x + dy * 0.008)) })); }
          else setPan(p => ({ x: p.x + dx / zoom, y: p.y + dy / zoom }));
        }}
        onMouseUp={() => (drag.current = null)}
        onMouseLeave={() => (drag.current = null)}
        onClick={() => { if (!drag.current?.moved) setSelected(null); }}
      >
        <g transform={`scale(${zoom}) translate(${pan.x} ${pan.y})`}>
          {edges.map(e => {
            const a = proj.get(e.source), b = proj.get(e.target);
            if (!a || !b) return null;
            const hl = highlightIds?.has(e.source) && highlightIds?.has(e.target);
            const active = selected && (e.source === selected || e.target === selected);
            const dim = selected && !active;
            return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={hl ? HIGHLIGHT : active ? '#2563EB' : '#CBD5E1'} strokeWidth={hl || active ? 1.8 : 0.9} opacity={dim ? 0.15 : 0.85} />;
          })}
          {order.map(n => {
            const p = proj.get(n.id)!;
            const isSel = selected === n.id;
            const hl = highlightIds?.has(n.id);
            const dim = selected && !neighbours.has(n.id);
            const r = (isSel ? 11 : 8) * p.s;
            return (
              <g key={n.id} transform={`translate(${p.x} ${p.y})`} opacity={dim ? 0.25 : 1} className="cursor-pointer" onClick={e => { e.stopPropagation(); setSelected(n.id); }}>
                {(isSel || hl) && <circle r={r + 5} fill="none" stroke={hl ? HIGHLIGHT : '#2563EB'} strokeWidth={2} opacity={0.45} />}
                <circle r={r} fill={colorForType(n.type)} stroke="#fff" strokeWidth={1.5} />
                {(zoom > 1.6 || isSel || (selected && neighbours.has(n.id)) || hl) && <text y={r + 11} textAnchor="middle" fontSize={8.5 * p.s} fill="#334155" fontWeight={isSel ? 700 : 500} style={{ paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3 }}>{n.label.length > 26 ? `${n.label.slice(0, 25)}…` : n.label}</text>}
              </g>
            );
          })}
        </g>
      </svg>

      {sel && (
        <div className="absolute top-14 right-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-dropdown p-4 z-20 animate-fade-in">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0">
              <p className="font-bold text-[#0F172A] text-[15px]">{sel.label}</p>
              <span className="inline-block text-[11.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mt-1 text-white" style={{ background: colorForType(sel.type) }}>{sel.type}</span>
              {sel.version && <span className="ml-1.5 text-[11.5px] font-mono text-slate-400">{sel.version}</span>}
            </div>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-[13.5px] text-slate-500 mt-2 leading-relaxed">{sel.description}</p>
          <p className="text-[11.5px] font-mono text-slate-400 mt-1">{sel.id}</p>
          {connections.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-[11.5px] font-bold text-slate-400 uppercase mb-1.5">Connections</p>
              <ul className="space-y-1 max-h-40 overflow-auto">
                {connections.map((c, i) => <li key={i} className="text-[13.5px] text-slate-600"><span className="text-slate-400">{c.dir}</span> {c.label}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
