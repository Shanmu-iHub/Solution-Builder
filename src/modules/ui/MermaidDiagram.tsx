import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  flowchart: { curve: 'basis', htmlLabels: true, nodeSpacing: 28, rankSpacing: 50, padding: 12 },
  themeVariables: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', primaryColor: '#EFF6FF', primaryBorderColor: '#2563EB', primaryTextColor: '#0F172A', lineColor: '#64748B', clusterBkg: '#FFFFFF', clusterBorder: '#CBD5E1', edgeLabelBackground: '#FFFFFF' },
});

let seq = 0;

/** Renders Mermaid text as an SVG. `zoom` multiplies the fit-to-width size; the container scrolls when it overflows. */
export const MermaidDiagram: React.FC<{ code: string; zoom?: number; onSvg?: (svg: string) => void; className?: string }> = ({ code, zoom = 1, onSvg, className }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const onSvgRef = useRef(onSvg);
  onSvgRef.current = onSvg;

  useEffect(() => {
    let stale = false;
    setError('');
    mermaid.render(`mmd-${++seq}`, code)
      .then(r => { if (!stale) { setSvg(r.svg); onSvgRef.current?.(r.svg); } })
      .catch(e => { if (!stale) { setSvg(''); setError(e instanceof Error ? e.message : 'Could not render the diagram.'); } });
    return () => { stale = true; };
  }, [code]);

  useEffect(() => {
    const el = holder.current?.querySelector('svg');
    if (!el || !box.current) return;
    const size = () => {
      const vb = el.viewBox.baseVal;
      if (!vb?.width) return;
      const fit = Math.min(1.4, Math.max(0.5, (box.current!.clientWidth - 48) / vb.width));
      el.style.maxWidth = 'none';
      el.setAttribute('width', String(Math.round(vb.width * fit * zoom)));
      el.setAttribute('height', String(Math.round(vb.height * fit * zoom)));
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [svg, zoom]);

  return (
    <div ref={box} className={`overflow-auto ${className ?? ''}`}>
      {error ? <div className="m-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-[13.5px] text-rose-700">Diagram could not be rendered: {error}</div>
        : !svg ? <div className="h-full min-h-[240px] flex items-center justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
        : <div ref={holder} className="w-max min-w-full p-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />}
    </div>
  );
};
