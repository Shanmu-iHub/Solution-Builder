import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Home,
  Box,
  User,
  Store,
  Sparkles,
  BarChart2,
  Database,
  FileText,
  Coins,
  Settings,
  HelpCircle,
  Layers,
  Monitor,
  ChevronRight,
  ChevronDown,
  X,
  Headphones,
  Image as ImageIcon,
  Mail,
  Presentation,
  Activity,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  DollarSign,
  GitBranch,
  Brain,
  Trophy,
  FlaskConical
} from 'lucide-react';

interface DrawerConfig {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    isActive: boolean;
  }[];
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    navigateToProduct,
    navigateToService,
    navigateToAgent,
    isSidebarExpanded,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    activeSettingsTab,
    setActiveSettingsTab
  } = useNavigation();

  // Active flyout drawer for items with sub-menus (Image 4 design)
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  // Auto-detect if current view belongs to a sub-menu to highlight the parent
  const isSolutionBuilderActive =
    currentView === 'solution-builder-fullstack' ||
    currentView === 'solution-builder-frontend' ||
    currentView === 'solution-builder-superagent' ||
    currentView === 'product-solution-architect' ||
    currentView === 'product-solution-factor' ||
    currentView === 'agent-deep-research';

  const isAiServicesActive =
    currentView === 'services' ||
    currentView.startsWith('service-') ||
    ['agent-call-for-me', 'agent-translation', 'agent-meeting-notes'].includes(currentView);

  const isProductsActive =
    currentView === 'products' ||
    (currentView.startsWith('product-') &&
      !currentView.startsWith('product-solution-') &&
      currentView !== 'product-ai-models');

  // Navigation handler
  const handleNav = (view: any, settingsTab?: string) => {
    setCurrentView(view);
    if (settingsTab) {
      setActiveSettingsTab(settingsTab);
    }
    setActiveDrawer(null);
    setIsMobileSidebarOpen(false);
  };

  const handleToggleDrawer = (key: string) => {
    setActiveDrawer(prev => (prev === key ? null : key));
  };

  // Close flyout on Escape or route change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Drawer Configurations for sub-items (Image 4)
  const drawers: Record<string, DrawerConfig> = {
    solutionBuilder: {
      key: 'solutionBuilder',
      title: 'Solution Builder',
      subtitle: 'Build end-to-end solutions with AI',
      icon: <Box className="w-5 h-5 text-[#0F172A]" />,
      items: [
        {
          id: 'fullstack',
          label: 'Full Stack',
          icon: <Layers className="w-4 h-4" />,
          action: () => {
            handleNav('solution-builder-fullstack');
          },
          isActive: currentView === 'solution-builder-fullstack'
        },
        {
          id: 'frontend',
          label: 'Frontend',
          icon: <Monitor className="w-4 h-4" />,
          action: () => {
            handleNav('solution-builder-frontend');
          },
          isActive: currentView === 'solution-builder-frontend'
        },
        {
          id: 'superagent',
          label: 'Super Agent',
          icon: <Sparkles className="w-4 h-4" />,
          action: () => {
            handleNav('solution-builder-superagent');
          },
          isActive: currentView === 'solution-builder-superagent'
        }
      ]
    },
    aiServices: {
      key: 'aiServices',
      title: 'AI Factory',
      subtitle: 'Next-generation AI workflows',
      icon: <Sparkles className="w-5 h-5 text-[#0F172A]" />,
      items: [
        {
          id: 'call-for-me',
          label: 'Sales & Support',
          icon: <Headphones className="w-4 h-4" />,
          action: () => {
            navigateToAgent('call-for-me');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'agent-call-for-me'
        },
        {
          id: 'ai-image',
          label: 'AI Image Studio',
          icon: <ImageIcon className="w-4 h-4" />,
          action: () => {
            navigateToService('ai-image');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'service-ai-image'
        },
        {
          id: 'mail',
          label: 'Mail & Translate',
          icon: <Mail className="w-4 h-4" />,
          action: () => {
            navigateToAgent('translation');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'agent-translation'
        },
        {
          id: 'meeting-notes',
          label: 'AI Meeting Notes',
          icon: <FileText className="w-4 h-4" />,
          action: () => {
            navigateToAgent('meeting-notes');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'agent-meeting-notes'
        },
        {
          id: 'ai-video',
          label: 'AI Slides & Video',
          icon: <Presentation className="w-4 h-4" />,
          action: () => {
            navigateToService('ai-video');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'service-ai-video'
        }
      ]
    },
    products: {
      key: 'products',
      title: 'Products',
      subtitle: 'Enterprise operations & observability',
      icon: <BarChart2 className="w-5 h-5 text-[#0F172A]" />,
      items: [
        {
          id: 'finops',
          label: 'FinOps',
          icon: <DollarSign className="w-4 h-4" />,
          action: () => {
            navigateToProduct('finops');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-finops'
        },
        {
          id: 'monitoring',
          label: 'Monitoring',
          icon: <Activity className="w-4 h-4" />,
          action: () => {
            navigateToProduct('monitoring');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-monitoring'
        },
        {
          id: 'testing',
          label: 'Testing',
          icon: <FlaskConical className="w-4 h-4" />,
          action: () => {
            navigateToProduct('testing');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-testing'
        },
        {
          id: 'devops',
          label: 'DevOps',
          icon: <GitBranch className="w-4 h-4" />,
          action: () => {
            navigateToProduct('devops');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-devops'
        },
        {
          id: 'compliance',
          label: 'Compliance',
          icon: <FileCheck className="w-4 h-4" />,
          action: () => {
            navigateToProduct('compliance');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-compliance'
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: <BarChart2 className="w-4 h-4" />,
          action: () => {
            navigateToProduct('analytics');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-analytics'
        },
        {
          id: 'audit',
          label: 'Audit',
          icon: <ShieldCheck className="w-4 h-4" />,
          action: () => {
            navigateToProduct('audit');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-audit'
        },
        {
          id: 'gamifications',
          label: 'Gamifications',
          icon: <Trophy className="w-4 h-4" />,
          action: () => {
            navigateToProduct('gamifications');
            setActiveDrawer(null);
            setIsMobileSidebarOpen(false);
          },
          isActive: currentView === 'product-gamifications'
        }
      ]
    }
  };

  // Helper for Nav Item Styling matching Images 2, 3, & 4
  const renderNavItem = (
    label: string,
    icon: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
    hasChevron?: boolean,
    isDrawerOpen?: boolean,
    onChevronClick?: () => void
  ) => {
    return (
      <div
        onClick={onClick}
        title={label}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-left group cursor-pointer relative select-none ${
          isActive || isDrawerOpen
            ? 'bg-[#E8F0FE] text-[#0F172A] font-semibold'
            : 'text-[#334155] hover:text-[#0F172A] hover:bg-slate-50'
        }`}
      >
        {/* Active Blue Left Indicator Bar */}
        {(isActive || isDrawerOpen) && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563EB] rounded-r-md" />
        )}

        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className={`w-[18px] h-[18px] shrink-0 transition-colors flex items-center justify-center ${
              isActive || isDrawerOpen ? 'text-[#0F172A]' : 'text-[#334155] group-hover:text-[#0F172A]'
            }`}
          >
            {icon}
          </span>
          {isSidebarExpanded && (
            <span className="text-[13px] tracking-tight truncate">{label}</span>
          )}
        </div>

        {isSidebarExpanded && hasChevron && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onChevronClick) {
                onChevronClick();
              } else {
                onClick();
              }
            }}
            title={`Toggle ${label} menu`}
            className={`p-1 -mr-1 rounded-lg transition-all duration-150 shrink-0 hover:bg-slate-200/70 ${
              isDrawerOpen
                ? 'text-[#2563EB] bg-blue-100/60'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-150 ${
                isDrawerOpen ? 'translate-x-0.5' : ''
              }`}
            />
          </button>
        )}
      </div>
    );
  };

  // Helper for Section Headers matching Images 2, 3, & 4
  const renderSectionHeader = (title: string) => {
    if (!isSidebarExpanded) return null;
    return (
      <div className="px-3 pt-3 pb-1">
        <span className="text-[10.5px] font-bold text-[#64748B] tracking-wider uppercase">
          {title}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => {
            setIsMobileSidebarOpen(false);
            setActiveDrawer(null);
          }}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Flyout Secondary Drawer Backdrop on Desktop */}
      {activeDrawer && (
        <div
          onClick={() => setActiveDrawer(null)}
          className="fixed inset-0 z-30 bg-transparent"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 bg-white border-r border-slate-200/90 select-none transition-all duration-200 flex flex-col ${
          isSidebarExpanded ? 'lg:w-64' : 'lg:w-[68px]'
        } ${isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Mobile Header with close button */}
        <div className="lg:hidden p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="font-bold text-sm text-[#0F172A] tracking-tight block">SNS SQUARE</span>
            <span className="text-[10px] text-slate-400 font-normal">Enterprise Platform</span>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Tree */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 space-y-1 text-xs custom-scrollbar">
          {/* Top Home Link */}
          <div className="mb-2">
            {renderNavItem(
              'Home',
              <Home className="w-[18px] h-[18px]" />,
              currentView === 'home',
              () => handleNav('home')
            )}
          </div>

          {/* Section 1: BUILD AND CREATE */}
          {renderSectionHeader('BUILD AND CREATE')}
          <div className="space-y-0.5">
            {renderNavItem(
              'Solution Builder',
              <Box className="w-[18px] h-[18px]" />,
              isSolutionBuilderActive,
              () => handleNav('solution-builder-fullstack'),
              true,
              activeDrawer === 'solutionBuilder',
              () => handleToggleDrawer('solutionBuilder')
            )}

            {renderNavItem(
              'Agent Builder',
              <User className="w-[18px] h-[18px]" />,
              currentView === 'agents',
              () => handleNav('agents')
            )}

            {renderNavItem(
              'Custom Agent',
              <Brain className="w-[18px] h-[18px]" />,
              currentView === 'custom-agent',
              () => handleNav('custom-agent')
            )}
          </div>

          {/* Section 2: OPERATE */}
          {renderSectionHeader('OPERATE')}
          <div className="space-y-0.5">
            {renderNavItem(
              'Products',
              <BarChart2 className="w-[18px] h-[18px]" />,
              isProductsActive,
              () => handleNav('products'),
              true,
              activeDrawer === 'products',
              () => handleToggleDrawer('products')
            )}

            {renderNavItem(
              'AI Factory',
              <Sparkles className="w-[18px] h-[18px]" />,
              isAiServicesActive,
              () => handleNav('services'),
              true,
              activeDrawer === 'aiServices',
              () => handleToggleDrawer('aiServices')
            )}
          </div>

          {/* Section 3: MARKETPLACE */}
          {renderSectionHeader('MARKETPLACE')}
          <div className="space-y-0.5">
            {renderNavItem(
              'Marketplace',
              <Store className="w-[18px] h-[18px]" />,
              currentView === 'marketplace' || currentView === 'product-ai-models',
              () => handleNav('marketplace')
            )}
          </div>

          {/* Divider */}
          <div className="my-2 border-t border-slate-100" />

          {/* Section 4: RESOURCES */}
          {renderSectionHeader('RESOURCES')}
          <div className="space-y-0.5">
            {renderNavItem(
              'Vault',
              <Database className="w-[18px] h-[18px]" />,
              currentView === 'settings' && activeSettingsTab === 'api-keys',
              () => handleNav('settings', 'api-keys')
            )}

            {renderNavItem(
              'Knowledge Base',
              <FileText className="w-[18px] h-[18px]" />,
              currentView === 'projects',
              () => handleNav('projects')
            )}
          </div>

          {/* Divider */}
          <div className="my-2 border-t border-slate-100" />

          {/* Section 5: ACCOUNT AND SUPPORT */}
          {renderSectionHeader('ACCOUNT AND SUPPORT')}
          <div className="space-y-0.5">
            {renderNavItem(
              'Credits',
              <Coins className="w-[18px] h-[18px]" />,
              currentView === 'billing' || currentView === 'usage',
              () => handleNav('billing')
            )}

            {renderNavItem(
              'Settings',
              <Settings className="w-[18px] h-[18px]" />,
              currentView === 'settings' && activeSettingsTab === 'general',
              () => handleNav('settings', 'general')
            )}

            {renderNavItem(
              'Help and Support',
              <HelpCircle className="w-[18px] h-[18px]" />,
              currentView === 'support',
              () => handleNav('support')
            )}
          </div>
        </div>
      </aside>

      {/* Secondary Flyout Drawer Panel (Image 4 Design) */}
      {activeDrawer && drawers[activeDrawer] && (
        <aside
          className={`fixed top-14 bottom-0 z-40 bg-white border-r border-slate-200/90 shadow-xl select-none transition-all duration-200 flex flex-col w-64 animate-slide-right ${
            isSidebarExpanded ? 'left-64' : 'left-[68px]'
          }`}
        >
          {/* Drawer Header matching Image 4 */}
          <div className="p-4 pb-3 border-b border-slate-100 flex items-start justify-between bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                {drawers[activeDrawer].icon}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F172A] tracking-tight leading-snug">
                  {drawers[activeDrawer].title}
                </h3>
                <p className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                  {drawers[activeDrawer].subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDrawer(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Submenu Items List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {drawers[activeDrawer].items.map(item => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-left cursor-pointer group ${
                  item.isActive
                    ? 'bg-[#E8F0FE] text-[#0F172A] font-semibold shadow-2xs'
                    : 'text-[#334155] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    item.isActive ? 'text-[#2563EB]' : 'text-slate-500 group-hover:text-[#0F172A]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[12.5px] truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>
      )}
    </>
  );
};

