import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkspaceView, ProductId, ServiceId, AgentId } from '../types';

interface NavigationContextType {
  currentView: WorkspaceView;
  setCurrentView: (view: WorkspaceView) => void;
  navigateToProduct: (id: ProductId) => void;
  navigateToService: (id: ServiceId) => void;
  navigateToAgent: (id: AgentId) => void;
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isAppLauncherOpen: boolean;
  setIsAppLauncherOpen: (open: boolean) => void;
  toggleAppLauncher: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  toggleNotification: () => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  toggleUserMenu: () => void;
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<WorkspaceView>('home');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<string>('general');

  const navigateToProduct = (id: ProductId) => {
    setCurrentView(`product-${id}`);
    setIsAppLauncherOpen(false);
    setIsSearchOpen(false);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (id: ServiceId) => {
    setCurrentView(`service-${id}`);
    setIsAppLauncherOpen(false);
    setIsSearchOpen(false);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAgent = (id: AgentId) => {
    setCurrentView(`agent-${id}`);
    setIsAppLauncherOpen(false);
    setIsSearchOpen(false);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  const toggleAppLauncher = () => {
    setIsAppLauncherOpen(!isAppLauncherOpen);
    setIsNotificationOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsAppLauncherOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsAppLauncherOpen(false);
    setIsNotificationOpen(false);
  };

  // Keyboard shortcut listener ('/' to open search, 'Escape' to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAppLauncherOpen(false);
        setIsNotificationOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateToProduct,
        navigateToService,
        navigateToAgent,
        isSidebarExpanded,
        setIsSidebarExpanded,
        toggleSidebar,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isAppLauncherOpen,
        setIsAppLauncherOpen,
        toggleAppLauncher,
        isSearchOpen,
        setIsSearchOpen,
        toggleSearch,
        isNotificationOpen,
        setIsNotificationOpen,
        toggleNotification,
        isUserMenuOpen,
        setIsUserMenuOpen,
        toggleUserMenu,
        activeSettingsTab,
        setActiveSettingsTab
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
