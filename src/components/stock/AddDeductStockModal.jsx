import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddDeductStockModal = () => {
  const {
    isAddStockModalOpen,
    setIsAddStockModalOpen,
    stockModalMode,
    setStockModalMode,
    selectedStockItem,
    stockList,
    handleStockAdjustment
  } = useApp();

  const [selectedSizeId, setSelectedSizeId] = useState(selectedStockItem ? selectedStockItem.id : (stockList[0]?.id || 'stock-1'));
  const [materialType, setMaterialType] = useState('PLY Frame');
  const [amount, setAmount] = useState('10');
  const [reason, setReason] = useState('Production batch complete');

  if (!isAddStockModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStockAdjustment(selectedSizeId, {
      materialType,
      amount: parseInt(amount, 10),
      reason,
      actionType: stockModalMode,
    });
    setIsAddStockModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${
              stockModalMode === 'add' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' :
              stockModalMode === 'deduct' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400' :
              'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
            }`}>
              {stockModalMode === 'add' ? <Plus className="w-5 h-5" /> :
               stockModalMode === 'deduct' ? <Minus className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {stockModalMode === 'add' ? 'Add Stock' :
                 stockModalMode === 'deduct' ? 'Deduct Stock' : 'Move to Pressing'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update inventory balance instantly
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddStockModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch mode */}
        <div className="flex p-1 m-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setStockModalMode('add')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              stockModalMode === 'add'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            + Add
          </button>
          <button
            type="button"
            onClick={() => setStockModalMode('deduct')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              stockModalMode === 'deduct'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            − Deduct
          </button>
          <button
            type="button"
            onClick={() => setStockModalMode('press')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              stockModalMode === 'press'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            🔥 Pressing
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-3.5">
          {/* Size Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Size & Product
            </label>
            <select
              value={selectedSizeId}
              onChange={(e) => setSelectedSizeId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              {stockList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.size} — {item.name} (Current: {item.merged} pcs)
                </option>
              ))}
            </select>
          </div>

          {/* Material Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Material Core
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['PLY Frame', 'PLY Pine', 'Full Pine'].map((mat) => (
                <button
                  type="button"
                  key={mat}
                  onClick={() => setMaterialType(mat)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    materialType === mat
                      ? 'bg-brand-50 dark:bg-brand-950 border-brand-500 text-brand-royal dark:text-blue-400 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Quick Step Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Quantity (Pieces)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-extrabold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <div className="flex gap-1">
                {[5, 10, 25, 50].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reason / Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Remark / Note
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Received from Workshop B / Dispatch"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-2xl text-white font-extrabold text-sm shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                stockModalMode === 'add'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
                  : stockModalMode === 'deduct'
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25'
                  : 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25'
              }`}
            >
              <Check className="w-4 h-4" />
              Confirm {stockModalMode === 'add' ? 'Stock Addition' : stockModalMode === 'deduct' ? 'Stock Deduction' : 'Pressing Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
