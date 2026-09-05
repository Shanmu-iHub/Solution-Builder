import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  subtitle?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-subtle hover:border-[#CBD5E1] transition-all duration-150 ${onClick ? 'cursor-pointer hover:shadow-card' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">{label}</p>
          <h3 className="text-2xl font-bold tracking-tight text-[#0F172A]">{value}</h3>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#2563EB]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
          {change && (
            <span className={`inline-flex items-center font-semibold ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-[#94A3B8] font-normal truncate ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
