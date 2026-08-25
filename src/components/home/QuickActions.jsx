import React from 'react';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActions = () => {
  const {
    setIsAddStockModalOpen,
    setStockModalMode,
    setIsNewOrderModalOpen,
    setActiveTab,
    setIsScannerModalOpen,
    setIsInvoiceModalOpen,
  } = useApp();

  const actions = [
    {
      id: 'add-stock',
      label: '+ Add Stock',
      icon: PlusCircle,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200/80 dark:border-emerald-800/60',
      onClick: () => {
        setStockModalMode('add');
        setIsAddStockModalOpen(true);
      },
    },
    {
      id: 'new-order',
      label: '+ New Order',
      icon: ShoppingCart,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200/80 dark:border-blue-800/60',
      onClick: () => setIsNewOrderModalOpen(true),
    },
    {
      id: 'attendance',
      label: 'Attendance',
      iconEmoji: '👷',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200/80 dark:border-amber-800/60',
      onClick: () => setActiveTab('staff'),
    },
    {
      id: 'scan-doc',
      label: 'Scan Doc',
      iconEmoji: '📷',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200/80 dark:border-purple-800/60',
      onClick: () => setIsScannerModalOpen(true),
    },
    {
      id: 'payment',
      label: 'Payment',
      iconEmoji: '💰',
      bgColor: 'bg-teal-50 dark:bg-teal-950/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-200/80 dark:border-teal-800/60',
      onClick: () => setActiveTab('more'),
    },
    {
      id: 'generate-pdf',
      label: 'Generate PDF',
      iconEmoji: '📄',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-200/80 dark:border-rose-800/60',
      onClick: () => setIsInvoiceModalOpen(true),
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
          Quick Actions
        </h2>
        <span className="text-[11px] text-slate-400">Touch friendly</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border ${action.bgColor} ${action.borderColor} shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-1.5 group-hover:rotate-6 transition-transform">
                {action.iconEmoji ? (
                  <span className="text-lg leading-none">{action.iconEmoji}</span>
                ) : (
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center tracking-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
