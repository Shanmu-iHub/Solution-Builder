import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant, size = 'sm' }) => {
  // Infer variant if not explicitly provided
  let determinedVariant = variant;
  if (!determinedVariant) {
    const s = status.toLowerCase();
    if (s.includes('active') || s.includes('ready') || s.includes('pass') || s.includes('compliant') || s.includes('success') || s.includes('prod')) {
      determinedVariant = 'success';
    } else if (s.includes('warn') || s.includes('review') || s.includes('idle') || s.includes('pending') || s.includes('beta')) {
      determinedVariant = 'warning';
    } else if (s.includes('error') || s.includes('fail') || s.includes('critical') || s.includes('denied') || s.includes('blocked')) {
      determinedVariant = 'error';
    } else if (s.includes('running') || s.includes('info') || s.includes('popular') || s.includes('sync')) {
      determinedVariant = 'info';
    } else if (s.includes('ai') || s.includes('voice') || s.includes('preview')) {
      determinedVariant = 'purple';
    } else {
      determinedVariant = 'neutral';
    }
  }

  const colorStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    error: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-blue-50 text-blue-700 border-blue-200/80',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200/80'
  };

  const dotStyles = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    purple: 'bg-indigo-500',
    neutral: 'bg-slate-400'
  };

  const sizeStyles = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colorStyles[determinedVariant]} ${sizeStyles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[determinedVariant]}`} />
      {status}
    </span>
  );
};
