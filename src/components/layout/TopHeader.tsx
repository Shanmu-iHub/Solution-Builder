import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useNotifications } from '../../context/NotificationContext';
import { AppLauncher } from './AppLauncher';
import { NotificationPanel } from './NotificationPanel';
import { UserMenu } from './UserMenu';
import snsLogo from '../../assets/SNS Square Logo.png';

export const TopHeader: React.FC = () => {
  const {
    toggleSidebar,
    isAppLauncherOpen,
    toggleAppLauncher,
    toggleSearch,
    isNotificationOpen,
    toggleNotification,
    isUserMenuOpen,
    toggleUserMenu,
    setCurrentView
  } = useNavigation();

  const { unreadCount } = useNotifications();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#07111F] border-b border-[#1E293B] z-40 px-3 lg:px-4 flex items-center justify-between select-none shadow-sm">
      {/* Left: Hamburger + Brand Logo & Name */}
      <div className="flex items-center gap-1.5 md:gap-3">
        {/* Hamburger Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors focus:outline-none cursor-pointer"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo & Name */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-800/40 transition-colors group cursor-pointer"
        >
          <img
            src={snsLogo}
            alt="SNS Square Logo"
            className="w-7 h-7 object-contain rounded-md group-hover:scale-105 transition-transform drop-shadow-sm"
          />
          <span className="text-white font-bold text-base tracking-tight hidden sm:inline-block">
            SNS Square
          </span>
        </button>
      </div>

      {/* Center: Large Global Search Bar */}
      <div className="flex-1 max-w-2xl mx-3 md:mx-6">
        <button
          onClick={toggleSearch}
          className="w-full h-9 px-3.5 rounded-lg bg-white/95 hover:bg-white text-slate-700 border border-slate-300 shadow-sm flex items-center gap-2.5 text-xs text-left group transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          aria-label="Search products, services, agents, documentation, and more"
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors shrink-0" />
          <span className="text-slate-500 truncate flex-1 font-normal">
            Search products, services, agents, documentation, and more (/)
          </span>
          <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
            /
          </kbd>
        </button>
      </div>

      {/* Right: Only Notification + 9 Dots + Profile */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* 1. Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotification}
            className={`p-2 rounded-lg relative transition-colors focus:outline-none cursor-pointer ${
              isNotificationOpen
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#07111F] animate-pulse" />
            )}
          </button>
          {isNotificationOpen && <NotificationPanel />}
        </div>

        {/* 2. 9-Dot Application Launcher */}
        <div className="relative group/launcher">
          <button
            onClick={toggleAppLauncher}
            className={`p-2 rounded-lg transition-colors focus:outline-none cursor-pointer ${
              isAppLauncherOpen
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
            title="SNS Square Product Launcher"
            aria-label="Product Launcher"
          >
            <div className="w-5 h-5 grid grid-cols-3 gap-0.5 p-0.5 items-center justify-center">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1 h-1 rounded-[1px] transition-colors ${
                    isAppLauncherOpen ? 'bg-blue-400' : 'bg-slate-300 group-hover/launcher:bg-white'
                  }`}
                />
              ))}
            </div>
          </button>

          {/* Hover Tooltip matching screenshot */}
          {!isAppLauncherOpen && (
            <div className="absolute right-0 top-12 hidden group-hover/launcher:flex items-center px-2.5 py-1 bg-white text-slate-800 text-[11px] font-medium rounded-lg shadow-lg border border-slate-200 whitespace-nowrap pointer-events-none z-50 animate-fade-in">
              <span>Click to view all products</span>
            </div>
          )}

          {isAppLauncherOpen && <AppLauncher />}
        </div>

        {/* 3. User Profile Pill */}
        <div className="relative ml-1">
          <button
            onClick={toggleUserMenu}
            className="flex items-center gap-2.5 p-1 pl-1.5 rounded-lg hover:bg-slate-800/70 transition-colors focus:outline-none cursor-pointer"
            aria-label="User profile menu"
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center border border-white/20 shadow-sm shrink-0">
              SS
            </div>

            {/* Name and Org */}
            <div className="hidden lg:flex flex-col text-left text-xs leading-tight">
              <span className="text-white font-medium text-[12px] truncate max-w-[120px]">Sanmugavel S</span>
              <span className="text-slate-400 text-[10px] font-normal">SNS Square</span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && <UserMenu />}
        </div>
      </div>
    </header>
  );
};
