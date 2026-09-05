import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { setCurrentView } = useNavigation();

  const getDefaultAction = (label: string) => {
    const lower = label.toLowerCase().trim();
    if (lower === 'services' || lower === 'ai services') return () => setCurrentView('services');
    if (lower === 'products') return () => setCurrentView('products');
    if (lower === 'agents' || lower === 'ai agents') return () => setCurrentView('agents');
    if (lower === 'home') return () => setCurrentView('home');
    if (lower === 'projects' || lower === 'knowledge base') return () => setCurrentView('projects');
    return undefined;
  };

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-[#64748B] mb-5 select-none" aria-label="Breadcrumb">
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-[#94A3B8]" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const defaultAction = getDefaultAction(item.label);
        const handleClick = () => {
          if (item.onClick) {
            item.onClick();
          }
          if (defaultAction) {
            defaultAction();
          }
        };

        const isClickable = !isLast && (Boolean(item.onClick) || Boolean(defaultAction));

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0" />
            {isLast || !isClickable ? (
              <span className={`truncate ${isLast ? 'font-semibold text-[#0F172A]' : 'font-normal text-[#64748B]'}`}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={handleClick}
                className="hover:text-[#2563EB] hover:underline text-[#64748B] transition-colors truncate font-medium cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
