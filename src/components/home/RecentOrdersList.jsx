import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../common/StatusBadge';

export const RecentOrdersList = () => {
  const { ordersList, setActiveTab } = useApp();

  // Highlight the 3 prompt examples
  const recentOrders = ordersList.slice(0, 3);

  return (
    <div className="px-4 py-2 mb-16">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Recent Orders
          </h2>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
        </div>
        <button
          onClick={() => setActiveTab('orders')}
          className="text-xs font-bold text-brand-royal dark:text-blue-400 flex items-center gap-0.5 hover:underline"
        >
          View All ({ordersList.length})
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setActiveTab('orders')}
            className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-md hover:border-brand-200 dark:hover:border-slate-700 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {order.customer}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    {order.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.quantity} × {order.size}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-500 dark:text-slate-400">{order.material}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                  ₹{order.total.toLocaleString('en-IN')}
                </div>
                <div className="mt-1">
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            </div>

            {/* Micro bottom bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{order.date}</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {order.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
