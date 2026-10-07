import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Search, X, AlertTriangle, Info, MoreVertical } from 'lucide-react';

export * from './CSuiteValidation';
export * from './CSuiteConfig';

/* ────────────────────────────────────────────────────────────────────────────
 * Shared building blocks for the Skills / Knowledge / Solution Factory /
 * Solution Planning modules. Same visual language as the rest of the prototype
 * (blue #2563EB accent, slate neutrals, rounded-xl cards).
 * ──────────────────────────────────────────────────────────────────────────── */

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) {
    const hours = Math.floor(diff / 3600000);
    return hours <= 0 ? 'Just now' : `${hours}h ago`;
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

export const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

/* ── Button ─────────────────────────────────────────────────────────────── */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'xs' | 'sm' | 'md';
  loading?: boolean;
  icon?: React.ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-subtle',
  dark: 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-subtle',
  secondary: 'bg-white text-[#334155] border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
  ghost: 'bg-transparent text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]',
  danger: 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'secondary', size = 'md', loading, icon, children, className, disabled, ...rest }) => (
  <button
    {...rest}
    disabled={disabled || loading}
    className={cx(
      'inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition-all duration-150 cursor-pointer select-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      size === 'xs' && 'px-2.5 py-1 text-[12.5px]',
      size === 'sm' && 'px-3 py-1.5 text-[13.5px]',
      size === 'md' && 'px-4 py-2 text-[14.5px]',
      buttonVariants[variant],
      className,
    )}
  >
    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
    {children}
  </button>
);

/* ── Card ───────────────────────────────────────────────────────────────── */

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { padded?: boolean; hover?: boolean }> = ({ padded = true, hover, className, children, ...rest }) => (
  <div
    {...rest}
    className={cx(
      'bg-white rounded-2xl border border-slate-200 shadow-subtle',
      padded && 'p-5',
      hover && 'transition-all duration-150 hover:shadow-card hover:border-slate-300 cursor-pointer',
      className,
    )}
  >
    {children}
  </div>
);

export const SectionLabel: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; right?: React.ReactNode }> = ({ children, icon, right }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">
      {icon}
      {children}
    </h3>
    {right}
  </div>
);

/* ── Badge ──────────────────────────────────────────────────────────────── */

export type Tone = 'slate' | 'blue' | 'green' | 'amber' | 'red' | 'indigo' | 'purple' | 'teal' | 'orange';
const toneStyles: Record<Tone, string> = {
  slate: 'bg-slate-50 text-slate-600 border-slate-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-rose-50 text-rose-700 border-rose-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
};

export const Badge: React.FC<{ tone?: Tone; children: React.ReactNode; dot?: boolean; className?: string; mono?: boolean }> = ({ tone = 'slate', children, dot, className, mono }) => (
  <span className={cx('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[12.5px] font-semibold whitespace-nowrap', mono && 'font-mono', toneStyles[tone], className)}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
    {children}
  </span>
);

/* ── Form controls ──────────────────────────────────────────────────────── */

const controlBase =
  'w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[14.5px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition disabled:bg-slate-50 disabled:text-slate-500';

export const Field: React.FC<{ label?: string; hint?: string; error?: string; required?: boolean; children: React.ReactNode; className?: string }> = ({ label, hint, error, required, children, className }) => (
  <label className={cx('block space-y-1.5', className)}>
    {label && (
      <span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </span>
    )}
    {children}
    {hint && !error && <span className="block text-[12.5px] text-slate-400 leading-snug">{hint}</span>}
    {error && <span className="block text-[12.5px] text-rose-500 font-medium">{error}</span>}
  </label>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...rest }, ref) => (
  <input ref={ref} {...rest} className={cx(controlBase, className)} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...rest }, ref) => (
  <textarea ref={ref} {...rest} className={cx(controlBase, 'resize-y', className)} />
));
Textarea.displayName = 'Textarea';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...rest }) => (
  <select {...rest} className={cx(controlBase, 'pr-8 cursor-pointer', className)}>
    {children}
  </select>
);

export const SearchInput: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string; className?: string }> = ({ value, onChange, placeholder = 'Search…', className }) => (
  <div className={cx('relative', className)}>
    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={cx(controlBase, 'pl-9')}
      autoComplete="off"
    />
  </div>
);

export const TagInput: React.FC<{ tags: string[]; onChange: (tags: string[]) => void; placeholder?: string }> = ({ tags, onChange, placeholder = 'Add a tag and press Enter' }) => {
  const [draft, setDraft] = useState('');
  const add = () => {
    const t = draft.trim().replace(/^#/, '');
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setDraft('');
  };
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button variant="dark" size="md" type="button" onClick={add}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-2 min-h-[24px]">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-medium pl-2.5 pr-1.5 py-0.5">
            #{t}
            <button type="button" onClick={() => onChange(tags.filter(x => x !== t))} className="text-slate-400 hover:text-rose-500">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({ checked, onChange, label }) => (
  <button type="button" onClick={() => onChange(!checked)} className="inline-flex items-center gap-2 cursor-pointer" aria-pressed={checked}>
    <span className={cx('w-9 h-5 rounded-full transition-colors relative', checked ? 'bg-[#2563EB]' : 'bg-slate-300')}>
      <span className={cx('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all', checked ? 'left-[18px]' : 'left-0.5')} />
    </span>
    {label && <span className="text-[14.5px] text-[#334155]">{label}</span>}
  </button>
);

/* ── Tabs ───────────────────────────────────────────────────────────────── */

export interface TabItem<T extends string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export function Tabs<T extends string>({ tabs, active, onChange, className }: { tabs: TabItem<NoInfer<T>>[]; active: T; onChange: (id: NoInfer<T>) => void; className?: string }) {
  return (
    <div className={cx('flex items-center gap-1 border-b border-slate-200 overflow-x-auto', className)}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            'flex items-center gap-2 px-4 py-2.5 text-[14.5px] font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors cursor-pointer',
            active === t.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]',
          )}
        >
          {t.icon}
          {t.label}
          {t.count !== undefined && (
            <span className={cx('text-[11.5px] font-bold px-1.5 py-px rounded-full', active === t.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500')}>{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControl<T extends string>({ options, value, onChange }: { options: { id: NoInfer<T>; label: string }[]; value: T; onChange: (id: NoInfer<T>) => void }) {
  return (
    <div className="inline-flex p-1 bg-slate-100 rounded-xl">
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cx('px-3 py-1.5 text-[13.5px] font-semibold rounded-lg transition cursor-pointer', value === o.id ? 'bg-white text-[#0F172A] shadow-subtle' : 'text-[#64748B] hover:text-[#0F172A]')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ── Stepper ────────────────────────────────────────────────────────────── */

export const Stepper: React.FC<{ steps: string[]; current: number; onJump?: (index: number) => void }> = ({ steps, current, onJump }) => (
  <div className="flex items-center w-full overflow-x-auto">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={label}>
          <button
            type="button"
            disabled={!onJump || i > current}
            onClick={() => onJump?.(i)}
            className="flex items-center gap-2 shrink-0 cursor-pointer disabled:cursor-default"
          >
            <span
              className={cx(
                'w-7 h-7 rounded-full flex items-center justify-center text-[13.5px] font-bold transition-all',
                done && 'bg-emerald-500 text-white',
                active && 'bg-[#2563EB] text-white ring-4 ring-blue-100',
                !done && !active && 'bg-slate-100 text-slate-400',
              )}
            >
              {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </span>
            <span className={cx('text-[13.5px] font-semibold hidden sm:block whitespace-nowrap', active || done ? 'text-[#0F172A]' : 'text-slate-400')}>{label}</span>
          </button>
          {i < steps.length - 1 && <div className={cx('h-0.5 mx-3 flex-1 min-w-[16px] rounded', done ? 'bg-emerald-400' : 'bg-slate-200')} />}
        </React.Fragment>
      );
    })}
  </div>
);

/* ── Page header ────────────────────────────────────────────────────────── */

export const PageHeader: React.FC<{ title: string; subtitle?: string; actions?: React.ReactNode; badge?: React.ReactNode; icon?: React.ReactNode }> = ({ title, subtitle, actions, badge, icon }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <div className="flex items-start gap-3 min-w-0">
      {icon && <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">{icon}</div>}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="text-[15px] text-[#64748B] mt-1 max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0 flex-wrap">{actions}</div>}
  </div>
);

export const StatTile: React.FC<{ label: string; value: React.ReactNode; hint?: string; icon?: React.ReactNode; tone?: Tone }> = ({ label, value, hint, icon, tone = 'blue' }) => (
  <Card className="flex items-start justify-between gap-3">
    <div className="min-w-0">
      <p className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-[#0F172A] mt-1 tracking-tight">{value}</p>
      {hint && <p className="text-[12.5px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
    {icon && <div className={cx('w-9 h-9 rounded-xl border flex items-center justify-center shrink-0', toneStyles[tone])}>{icon}</div>}
  </Card>
);

export const ProgressBar: React.FC<{ value: number; tone?: Tone; className?: string }> = ({ value, tone = 'blue', className }) => {
  const color = { blue: 'bg-[#2563EB]', green: 'bg-emerald-500', amber: 'bg-amber-500', red: 'bg-rose-500', indigo: 'bg-indigo-500', purple: 'bg-purple-500', teal: 'bg-teal-500', slate: 'bg-slate-400', orange: 'bg-orange-500' }[tone];
  return (
    <div className={cx('h-1.5 w-full bg-slate-100 rounded-full overflow-hidden', className)}>
      <div className={cx('h-full rounded-full transition-all duration-500', color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
};

export const EmptyBlock: React.FC<{ icon?: React.ReactNode; title: string; message?: string; action?: React.ReactNode }> = ({ icon, title, message, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white border border-dashed border-slate-300 rounded-2xl">
    {icon && <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">{icon}</div>}
    <h3 className="text-[17px] font-bold text-[#0F172A]">{title}</h3>
    {message && <p className="text-[15px] text-[#64748B] mt-1 max-w-sm leading-relaxed">{message}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const Callout: React.FC<{ tone?: 'info' | 'warning' | 'error' | 'success'; title?: string; children: React.ReactNode; action?: React.ReactNode }> = ({ tone = 'info', title, children, action }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  }[tone];
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'info' ? Info : AlertTriangle;
  return (
    <div className={cx('flex items-start gap-3 rounded-xl border px-4 py-3 text-[14.5px]', styles)}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0 leading-relaxed">
        {title && <p className="font-bold">{title}</p>}
        <div>{children}</div>
      </div>
      {action}
    </div>
  );
};

/* ── Pagination ─────────────────────────────────────────────────────────── */

export const Pagination: React.FC<{ page: number; pageSize: number; total: number; onPage: (p: number) => void; onPageSize?: (n: number) => void }> = ({ page, pageSize, total, onPage, onPageSize }) => {
  if (total <= 0) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/60 rounded-b-2xl text-[13.5px] text-[#64748B]">
      <div className="flex items-center gap-2">
        {onPageSize && (
          <>
            <span>Rows per page</span>
            <select value={pageSize} onChange={e => onPageSize(Number(e.target.value))} className="border border-slate-200 rounded-lg bg-white px-2 py-1 text-[13.5px]">
              {[5, 10, 20, 50].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span>
          {from}–{to} of {total}
        </span>
        <div className="flex gap-1">
          <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button disabled={to >= total} onClick={() => onPage(page + 1)} className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Menu (row actions) ─────────────────────────────────────────────────── */

export interface MenuItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
  hidden?: boolean;
}

export const RowMenu: React.FC<{ items: MenuItem[]; align?: 'left' | 'right' }> = ({ items, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <div ref={ref} className="relative inline-block" onClick={e => e.stopPropagation()}>
      <button onClick={() => setOpen(o => !o)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 cursor-pointer">
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className={cx('absolute z-30 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-dropdown py-1', align === 'right' ? 'right-0' : 'left-0')}>
          {items
            .filter(i => !i.hidden)
            .map(i => (
              <button
                key={i.label}
                onClick={() => {
                  setOpen(false);
                  i.onSelect();
                }}
                className={cx('w-full text-left px-3 py-2 text-[13.5px] font-medium hover:bg-slate-50 cursor-pointer', i.danger ? 'text-rose-600' : 'text-[#334155]')}
              >
                {i.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

/* ── Confirm dialog ─────────────────────────────────────────────────────── */

export const ConfirmDialog: React.FC<{
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}> = ({ open, title, description, confirmText = 'Confirm', danger, onConfirm, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-modal border border-slate-200 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start gap-3">
          <div className={cx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', danger ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-[#2563EB]')}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#0F172A]">{title}</h3>
            <p className="text-[15px] text-[#64748B] mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            className={danger ? '!bg-rose-600 !text-white hover:!bg-rose-700 !border-rose-600' : ''}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ── Toasts ─────────────────────────────────────────────────────────────── */

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: 'success' | 'error' | 'info';
}
interface ToastContextValue {
  toast: (t: { title: string; description?: string; tone?: ToastItem['tone'] }) => void;
}
const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const toast = useCallback<ToastContextValue['toast']>(t => {
    const id = Date.now() + Math.random();
    setItems(prev => [...prev, { id, tone: 'success', ...t }]);
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 3600);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[70] space-y-2 w-80 max-w-[calc(100vw-2.5rem)]">
        {items.map(i => (
          <div key={i.id} className="bg-white border border-slate-200 rounded-xl shadow-dropdown px-4 py-3 flex items-start gap-3 animate-fade-in">
            {i.tone === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : i.tone === 'error' ? <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" /> : <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />}
            <div className="min-w-0">
              <p className="text-[14.5px] font-semibold text-[#0F172A]">{i.title}</p>
              {i.description && <p className="text-[13.5px] text-[#64748B] mt-0.5 leading-snug">{i.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => undefined } as ToastContextValue;
  return ctx;
};

/* ── Local breadcrumb (module-internal navigation) ──────────────────────── */

export const Crumbs: React.FC<{ items: { label: string; onClick?: () => void }[] }> = ({ items }) => (
  <nav className="flex items-center gap-1.5 text-[13.5px] text-[#64748B] mb-4 select-none flex-wrap">
    {items.map((item, i) => {
      const last = i === items.length - 1;
      return (
        <React.Fragment key={`${item.label}-${i}`}>
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
          {item.onClick && !last ? (
            <button onClick={item.onClick} className="hover:text-[#2563EB] hover:underline font-medium cursor-pointer">
              {item.label}
            </button>
          ) : (
            <span className={last ? 'font-semibold text-[#0F172A]' : ''}>{item.label}</span>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

/* ── Simple modal shell (wider variants than common/Modal) ──────────────── */

export const Dialog: React.FC<{ open: boolean; onClose: () => void; title: string; subtitle?: string; width?: string; children: React.ReactNode; footer?: React.ReactNode }> = ({ open, onClose, title, subtitle, width = 'max-w-2xl', children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className={cx('w-full bg-white rounded-2xl shadow-modal border border-slate-200 flex flex-col max-h-[88vh]', width)} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70 rounded-t-2xl">
          <div>
            <h3 className="text-[17px] font-bold text-[#0F172A]">{title}</h3>
            {subtitle && <p className="text-[13.5px] text-[#64748B] mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-200/70 cursor-pointer" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 rounded-b-2xl flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

/* ── Brand icons (lucide v1 no longer ships these) ─────────────────────── */

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);
