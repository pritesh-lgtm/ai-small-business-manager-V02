import React, { useState } from 'react';
import { X, Plus, Minus, ArrowRightLeft, History, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StockStatusBadge } from '../common/StatusBadge';

export const StockDetailModal = () => {
  const {
    selectedStockItem,
    isStockDetailOpen,
    setIsStockDetailOpen,
    setIsAddStockModalOpen,
    setStockModalMode,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // overview | timeline

  if (!isStockDetailOpen || !selectedStockItem) return null;

  const handleAction = (mode) => {
    setStockModalMode(mode);
    setIsAddStockModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-royal dark:text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white font-mono">
                  {selectedStockItem.size}
                </h2>
                <StockStatusBadge status={selectedStockItem.status} label={selectedStockItem.statusLabel} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedStockItem.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStockDetailOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Main Total Available Hero Card */}
          <div className="p-4 bg-gradient-to-br from-brand-royal via-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  Total Available
                </div>
                <div className="text-3xl font-black mt-1">
                  {selectedStockItem.merged} <span className="text-base font-normal text-blue-200">pcs</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-emerald-200">Ready to Dispatch</div>
                <div className="text-xl font-extrabold text-emerald-300">
                  {selectedStockItem.availableToSell} pcs
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs text-blue-100">
              <div>Sq.Ft / Piece: <span className="font-bold text-white">{selectedStockItem.sqftPerPiece} sq.ft</span></div>
              <div className="text-right">Standard Rate: <span className="font-bold text-white">₹{selectedStockItem.unitRate}/sq.ft</span></div>
            </div>
          </div>

          {/* Core Materials Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
              Material Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">PLY Frame</div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {selectedStockItem.plyFrame} <span className="text-xs font-normal text-slate-400">pcs</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Poplar Pine Core</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">PLY Pine</div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {selectedStockItem.plyPine} <span className="text-xs font-normal text-slate-400">pcs</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Imported New Zealand Pine</div>
              </div>
            </div>
          </div>

          {/* Workflow & Buffer Status */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
              Production & Reserve Status
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-center">
                <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">In Pressing</div>
                <div className="text-base font-extrabold text-amber-900 dark:text-amber-100 mt-0.5">
                  {selectedStockItem.inPressing} pcs
                </div>
                <div className="text-[9px] text-amber-600 dark:text-amber-400">Under hot press</div>
              </div>

              <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-center">
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">Reserved</div>
                <div className="text-base font-extrabold text-blue-900 dark:text-blue-100 mt-0.5">
                  {selectedStockItem.reserved} pcs
                </div>
                <div className="text-[9px] text-blue-600 dark:text-blue-400">Patel Traders</div>
              </div>

              <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Available to Sell</div>
                <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-100 mt-0.5">
                  {selectedStockItem.availableToSell} pcs
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400">Ready in godown</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleAction('add')}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                + Add Stock
              </button>

              <button
                onClick={() => handleAction('deduct')}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Minus className="w-4 h-4" />
                − Deduct Stock
              </button>

              <button
                onClick={() => showToast('Stock transfer modal opened for Workshop B')}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Transfer
              </button>

              <button
                onClick={() => setActiveTab(activeTab === 'overview' ? 'timeline' : 'overview')}
                className="py-2.5 px-3 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-royal dark:text-blue-300 font-bold text-xs border border-brand-200 dark:border-brand-800 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <History className="w-3.5 h-3.5" />
                View History
              </button>
            </div>
          </div>

          {/* Stock Movement Timeline */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                Stock Movement Timeline
              </h3>
              <span className="text-[10px] text-slate-400">Audit Log</span>
            </div>

            <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-800 pl-3 ml-2">
              {selectedStockItem.timeline.map((entry) => (
                <div key={entry.id} className="relative pb-2">
                  <div className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                    entry.type === 'add' ? 'bg-emerald-500' :
                    entry.type === 'deduct' ? 'bg-rose-500' :
                    entry.type === 'pressing' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {entry.action}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{entry.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Logged by: <span className="font-medium">{entry.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => setIsStockDetailOpen(false)}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
