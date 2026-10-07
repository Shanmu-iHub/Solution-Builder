import React from 'react';
import { CSUITE_CONFIG, ROLE_LABELS, ValidationStatus } from '../../ui';
import { Chip } from '../discovery/DiscoveryDashboard';

/** Quiet per-phase view of who reviews the phase and where it stands. Full detail lives in the Executive Panel at the top. */
export const CSuiteValidation: React.FC<{ stageId: string; status: ValidationStatus; className?: string }> = ({ stageId, status, className }) => {
  const config = CSUITE_CONFIG.find(c => c.stageId === stageId);
  if (!config) return null;
  const validated = status === 'Validated';
  return (
    <section className={`rounded-xl border border-slate-200 bg-white ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
        <h3 className="text-[14px] font-semibold text-[#0F172A]">C-Suite review</h3>
        <Chip tone={validated ? 'green' : status === 'Failed' ? 'red' : undefined}>{status}</Chip>
      </div>
      <ul className="p-4 space-y-2">
        {config.reviews.map(r => (
          <li key={r.role} className="flex items-center justify-between gap-3 text-[13.5px]">
            <span className="text-slate-700">{ROLE_LABELS[r.role]}</span>
            <span className={validated ? 'text-slate-700' : 'text-slate-400'}>{validated ? 'Validated' : 'Pending'}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
