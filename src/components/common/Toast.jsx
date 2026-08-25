import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4 animate-bounce">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-xl backdrop-blur-md border border-slate-700 dark:border-slate-200">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
        <p className="text-xs font-semibold leading-tight">{toast.message}</p>
      </div>
    </div>
  );
};
