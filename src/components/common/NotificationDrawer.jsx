import React from 'react';
import { X, Bell, AlertTriangle, ShoppingBag, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, setNotifications, setActiveTab } = useApp();

  if (!isNotificationsOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-rose-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-12 animate-slideDown">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'warning') setActiveTab('stock');
                if (item.type === 'order') setActiveTab('orders');
                if (item.type === 'payment') setActiveTab('more');
                setIsNotificationsOpen(false);
              }}
              className={`p-3.5 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                !item.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
              }`}
            >
              <div className="mt-0.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] text-slate-400">All alerts auto-synchronized with factory floor</p>
        </div>
      </div>
    </div>
  );
};
