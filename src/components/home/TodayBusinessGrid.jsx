import React from 'react';
import { Package, Clock, AlertCircle, IndianRupee, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TodayBusinessGrid = () => {
  const { totalOrdersCount, pendingOrdersCount, lowStockItems, outstandingPayments, setActiveTab } = useApp();

  const businessCards = [
    {
      id: 'orders-today',
      title: "Orders Today",
      value: `${totalOrdersCount} orders`,
      detail: "12 dispatched • 6 in line",
      icon: Package,
      iconBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      onClick: () => setActiveTab('orders'),
    },
    {
      id: 'pending-orders',
      title: "Pending Orders",
      value: `${pendingOrdersCount}`,
      detail: "Needs packing & loading",
      badge: "Action Required",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      icon: Clock,
      iconBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
      onClick: () => setActiveTab('orders'),
    },
    {
      id: 'stock-alerts',
      title: "Stock Alerts",
      value: `${lowStockItems.length} sizes running low`,
      detail: "75×35 & 84×40 critical",
      badge: "Urgent",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      icon: AlertCircle,
      iconBg: "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400",
      onClick: () => setActiveTab('stock'),
    },
    {
      id: 'outstanding-payments',
      title: "Outstanding Payments",
      value: `₹${outstandingPayments.toLocaleString('en-IN')}`,
      detail: "Across 3 active buyers",
      badge: "Khata",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      icon: IndianRupee,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
      onClick: () => setActiveTab('more'),
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
          Today's Business
        </h2>
        <span className="text-[11px] text-slate-400">Tap to inspect</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {businessCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-md hover:border-brand-200 dark:hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${card.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {card.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">{card.detail}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
