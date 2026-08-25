import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIInsightCard = () => {
  const { setActiveTab, openAskAi, stockList, handleOpenStockDetail } = useApp();

  const handleViewStock = () => {
    const item = stockList.find(s => s.size === '80 × 38') || stockList[0];
    handleOpenStockDetail(item);
    setActiveTab('stock');
  };

  return (
    <div className="px-4 py-2">
      <div className="relative overflow-hidden rounded-3xl p-4 bg-gradient-to-br from-ai-900 via-indigo-900 to-slate-900 text-white shadow-xl shadow-ai-900/20 border border-ai-500/30 group">
        {/* Background decorative ambient glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-ai-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-ai-500/30 text-ai-200 backdrop-blur-md border border-ai-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-ai-300 animate-spin" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-ai-200">
                AI Business Insight
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Demand Surge +32%
            </span>
          </div>

          {/* Insight Quote */}
          <p className="text-sm font-medium text-slate-100 leading-relaxed pr-2">
            “<span className="text-amber-300 font-bold">80×38</span> has been ordered <span className="text-emerald-400 font-bold">32% more</span> this week. Consider increasing pressing production.”
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-4 pt-1">
            <button
              onClick={handleViewStock}
              className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              View Stock
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </button>

            <button
              onClick={() => openAskAi("How much 80x38 production should I schedule based on current raw material and pending orders?")}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-ai-500 to-indigo-500 hover:from-ai-600 hover:to-indigo-600 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-ai-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
