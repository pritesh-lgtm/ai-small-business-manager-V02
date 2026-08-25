import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { profile, notifications, isNotificationsOpen, setIsNotificationsOpen, openAskAi } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 pt-3 pb-3 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Left: User Greeting */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-royal to-blue-500 flex items-center justify-center text-white font-bold shadow-md shadow-brand-500/20 text-sm border-2 border-white dark:border-slate-800">
              {profile.ownerName.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
                Good Morning, {profile.ownerName.split(' ')[0]}
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Here's what needs your attention today
            </p>
          </div>
        </div>

        {/* Right: Quick Notification & AI badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => openAskAi()}
            className="p-2 rounded-xl text-ai-600 bg-ai-50 hover:bg-ai-100 dark:bg-ai-950/60 dark:text-ai-300 dark:hover:bg-ai-900/80 transition-all flex items-center gap-1 text-xs font-semibold"
            title="Vyapar AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-ai-500 animate-pulse" />
            <span className="hidden sm:inline">AI</span>
          </button>

          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
