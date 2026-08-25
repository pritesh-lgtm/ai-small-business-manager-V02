import React from 'react';
import { TrendingUp, ShoppingBag, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessHealthCards = () => {
  const { todaySales, totalOrdersCount, pendingOrdersCount, lowStockItems, setActiveTab } = useApp();

  const cards = [
    {
      id: 'sales',
      title: "Today's Sales",
      value: `₹${todaySales.toLocaleString('en-IN')}`,
      subtitle: '+14% vs yesterday',
      trendUp: true,
      bgGradient: 'from-blue-600 to-indigo-700',
      textColor: 'text-white',
      icon: TrendingUp,
      onClick: () => setActiveTab('orders'),
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: totalOrdersCount.toString(),
      subtitle: '12 delivered / 6 queue',
      trendUp: true,
      bgGradient: 'from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/80',
      textColor: 'text-slate-900 dark:text-white',
      border: 'border border-blue-100 dark:border-slate-700',
      icon: ShoppingBag,
      iconColor: 'text-blue-600 dark:text-blue-400',
      onClick: () => setActiveTab('orders'),
    },
    {
      id: 'pending',
      title: 'Pending Orders',
      value: pendingOrdersCount.toString(),
      subtitle: 'Requires packing',
      bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-slate-800',
      textColor: 'text-amber-900 dark:text-amber-100',
      border: 'border border-amber-200/70 dark:border-amber-900/50',
      icon: Clock,
      iconColor: 'text-amber-600 dark:text-amber-400',
      onClick: () => setActiveTab('orders'),
    },
    {
      id: 'low-stock',
      title: 'Low Stock',
      value: `${lowStockItems.length} Sizes`,
      subtitle: 'Production needed',
      bgGradient: 'from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-slate-800',
      textColor: 'text-rose-900 dark:text-rose-100',
      border: 'border border-rose-200/70 dark:border-rose-900/50',
      icon: AlertTriangle,
      iconColor: 'text-rose-600 dark:text-rose-400',
      onClick: () => setActiveTab('stock'),
    },
  ];

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4 mb-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
          Business Health
        </h2>
        <span className="text-[11px] font-medium text-brand-royal dark:text-blue-400">Live Sync 🟢</span>
      </div>

      {/* Horizontally scrollable carousel */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`min-w-[170px] max-w-[185px] shrink-0 p-4 rounded-2xl shadow-soft cursor-pointer snap-start transition-all hover:scale-[1.02] active:scale-[0.98] ${
                card.id === 'sales'
                  ? 'bg-gradient-to-br from-brand-royal via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20'
                  : `bg-gradient-to-br ${card.bgGradient} ${card.border || ''}`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-semibold ${
                    card.id === 'sales' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {card.title}
                </span>
                <div
                  className={`p-1.5 rounded-xl ${
                    card.id === 'sales'
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'bg-white dark:bg-slate-700 shadow-sm'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${card.iconColor || 'text-white'}`} />
                </div>
              </div>

              <div className="my-1">
                <div className={`text-xl font-extrabold tracking-tight ${card.textColor}`}>
                  {card.value}
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2">
                {card.trendUp && (
                  <ArrowUpRight className="w-3 h-3 text-emerald-300 dark:text-emerald-400" />
                )}
                <span
                  className={`text-[10px] font-medium truncate ${
                    card.id === 'sales'
                      ? 'text-blue-100 font-semibold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {card.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
