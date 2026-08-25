import React from 'react';
import { AlertTriangle, XCircle, Clock, Check, RefreshCw } from 'lucide-react';

export const StockStatusBadge = ({ status, label }) => {
  if (status === 'healthy') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        {label || 'Healthy'}
      </span>
    );
  }
  if (status === 'medium') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        {label || 'Medium'}
      </span>
    );
  }
  if (status === 'low') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
        {label || 'Low Stock'}
      </span>
    );
  }
  // out
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
      <XCircle className="w-3.5 h-3.5 text-rose-500" />
      {label || 'Out of Stock'}
    </span>
  );
};

export const OrderStatusBadge = ({ status }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700">
          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          Pending
        </span>
      );
    case 'processing':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
          <RefreshCw className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-spin" />
          Processing
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700">
          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          <XCircle className="w-3 h-3 text-slate-500" />
          Cancelled
        </span>
      );
    default:
      return null;
  }
};
