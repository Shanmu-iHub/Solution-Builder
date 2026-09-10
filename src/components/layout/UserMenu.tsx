import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Briefcase,
  Sliders,
  Key,
  CreditCard,
  ShieldCheck,
  LogOut,
  ExternalLink
} from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { setCurrentView, setIsUserMenuOpen, setActiveSettingsTab } = useNavigation();
  const { logout, user } = useAuth();

  const handleNav = (view: any, settingsTab?: string) => {
    setCurrentView(view);
    if (settingsTab) {
      setActiveSettingsTab(settingsTab);
    }
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  return (
    <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-dropdown border border-[#E2E8F0] overflow-hidden z-50 animate-slide-down text-[#0F172A]">
      {/* User Header Info */}
      <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-900 font-bold text-sm flex items-center justify-center border border-white shadow-sm shrink-0">
            {user?.initials || 'SS'}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] truncate">{user?.name || 'Sanmugavel S'}</h4>
            <p className="text-[11px] text-[#64748B] truncate">{user?.email || 'sanmugavel@snssquare.com'}</p>
            <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Enterprise Admin
            </span>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-2 text-xs space-y-0.5">
        <button
          onClick={() => handleNav('settings', 'profile')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <User className="w-4 h-4 text-[#64748B]" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => handleNav('projects')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <Briefcase className="w-4 h-4 text-[#64748B]" />
          <span>My Workspace & Projects</span>
        </button>

        <button
          onClick={() => handleNav('settings', 'api-keys')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <Key className="w-4 h-4 text-[#64748B]" />
          <span>API Keys & Tokens</span>
        </button>

        <button
          onClick={() => handleNav('billing')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <CreditCard className="w-4 h-4 text-[#64748B]" />
          <span>Billing & Usage</span>
        </button>

        <button
          onClick={() => handleNav('settings', 'security')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-[#64748B]" />
          <span>Security & 2FA</span>
        </button>

        <button
          onClick={() => handleNav('settings', 'general')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] text-left transition-colors"
        >
          <Sliders className="w-4 h-4 text-[#64748B]" />
          <span>Workspace Preferences</span>
        </button>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-2 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 text-left font-medium transition-colors text-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
