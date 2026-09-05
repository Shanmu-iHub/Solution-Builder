import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigation } from '../../context/NavigationContext';
import { Check, Trash2, Bell, AlertTriangle, Cpu, DollarSign, Shield, ArrowRight } from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const { setCurrentView, setIsNotificationOpen } = useNavigation();

  const getIcon = (type: string) => {
    switch (type) {
      case 'system': return <Cpu className="w-4 h-4 text-blue-600" />;
      case 'agent': return <AlertTriangle className="w-4 h-4 text-purple-600" />;
      case 'billing': return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'security': return <Shield className="w-4 h-4 text-amber-600" />;
      default: return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-dropdown border border-[#E2E8F0] overflow-hidden z-50 animate-slide-down text-[#0F172A]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Notifications</h4>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[11px] text-[#2563EB] hover:text-[#1D4ED8] font-medium flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F1F5F9]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-[#64748B]">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-medium text-[#0F172A]">No notifications</p>
            <p className="text-[11px] text-[#94A3B8]">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 flex items-start gap-3 hover:bg-[#F8FAFC] transition-colors relative group ${!item.read ? 'bg-blue-50/40' : ''
                }`}
            >
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold text-[#0F172A] truncate pr-2">
                    {item.title}
                  </h5>
                  <span className="text-[10px] text-[#94A3B8] shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
                  {item.message}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {!item.read && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="text-[10px] text-[#2563EB] hover:underline font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => clearNotification(item.id)}
                    className="text-[10px] text-slate-400 hover:text-rose-600 ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
        <button
          onClick={() => {
            setCurrentView('activity');
            setIsNotificationOpen(false);
          }}
          className="text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1"
        >
          <span>View all activity logs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
