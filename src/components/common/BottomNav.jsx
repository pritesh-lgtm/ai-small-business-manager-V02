import React from 'react';
import { Home, Package, ShoppingCart, Users, MoreHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, openAskAi, pendingOrdersCount, lowStockItems } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'stock', label: 'Stock', icon: Package, badge: lowStockItems.length > 0 ? lowStockItems.length : null },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto pointer-events-auto">
      {/* Floating AI Button & Tooltip positioned prominently above navigation */}
      <div className="relative flex flex-col items-center mb-[-18px] z-50">
        {/* Floating tooltip */}
        <div className="mb-2 px-3 py-1 bg-gradient-to-r from-ai-600 to-indigo-600 text-white rounded-full shadow-lg shadow-ai-500/30 flex items-center gap-1.5 border border-ai-300/40 animate-bounce">
          <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
          <span className="text-[11px] font-semibold tracking-wide">Ask anything about my business</span>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => openAskAi()}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-ai-700 via-ai-600 to-indigo-500 text-white shadow-xl shadow-ai-600/40 hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white dark:border-slate-900"
          aria-label="Ask AI Copilot"
        >
          <div className="absolute inset-0 rounded-full bg-ai-500 opacity-30 group-hover:opacity-75 blur-md transition-opacity"></div>
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

      {/* Bottom Bar Container */}
      <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 shadow-2xl rounded-t-3xl">
        <div className="grid grid-cols-5 items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-150 ${
                  isActive
                    ? 'text-brand-royal dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 min-w-[16px] h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>

                {isActive && (
                  <span className="w-1.5 h-1.5 bg-brand-royal dark:bg-blue-400 rounded-full mt-0.5 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
