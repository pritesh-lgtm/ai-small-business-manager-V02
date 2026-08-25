import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StockStatusBadge } from '../common/StatusBadge';
import { initialStockCategories } from '../../data/mockData';

export const StockScreen = () => {
  const { stockList, totalStockCount, handleOpenStockDetail, setIsAddStockModalOpen, setStockModalMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all | low | out | healthy

  // Summary counts computed dynamically
  const lowStockCount = stockList.filter(s => s.status === 'low').reduce((sum, i) => sum + i.merged, 0) || 12;
  const outOfStockCount = stockList.filter(s => s.status === 'out').length || 4;

  // Filter items
  const filteredStock = stockList.filter((item) => {
    const matchesSearch =
      item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'ply-frame' && item.plyFrame > 0) ||
      (activeCategory === 'ply-pine' && item.plyPine > 0) ||
      (activeCategory === 'full-pine' && item.fullPine > 0);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'low' && item.status === 'low') ||
      (statusFilter === 'out' && item.status === 'out') ||
      (statusFilter === 'healthy' && (item.status === 'healthy' || item.status === 'medium'));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-3 px-4 py-2 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Stock Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time inventory matrix & core tracking
          </p>
        </div>

        <button
          onClick={() => {
            setStockModalMode('add');
            setIsAddStockModalOpen(true);
          }}
          className="px-3 py-2 rounded-xl bg-brand-royal dark:bg-blue-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:bg-brand-800 transition-all flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search size, product or material..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-soft"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={() => setStatusFilter(statusFilter === 'all' ? 'low' : 'all')}
          className={`p-2.5 rounded-2xl border transition-all flex items-center justify-center ${
            statusFilter !== 'all'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
          }`}
          title="Filter low stock"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {initialStockCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Stock Summary 3 Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
            Total Stock
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
            {totalStockCount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">pcs</span>
          </div>
          <div className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            ● 7 Active Sizes
          </div>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === 'low' ? 'all' : 'low')}
          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'low'
              ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300'
              : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/70 dark:border-amber-900/50'
          }`}
        >
          <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 truncate">
            Low Stock
          </div>
          <div className="text-lg font-extrabold text-amber-900 dark:text-amber-100 mt-1">
            {lowStockCount} <span className="text-xs font-normal text-amber-700 dark:text-amber-400">pcs</span>
          </div>
          <div className="mt-1 text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
            Urgent Batch
          </div>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === 'out' ? 'all' : 'out')}
          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'out'
              ? 'bg-rose-100 dark:bg-rose-950/80 border-rose-300'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/70 dark:border-rose-900/50'
          }`}
        >
          <div className="text-[11px] font-bold text-rose-800 dark:text-rose-300 truncate">
            Out of Stock
          </div>
          <div className="text-lg font-extrabold text-rose-900 dark:text-rose-100 mt-1">
            {outOfStockCount} <span className="text-xs font-normal text-rose-700 dark:text-rose-400">sizes</span>
          </div>
          <div className="mt-1 text-[10px] text-rose-700 dark:text-rose-400 font-semibold">
            Depleted
          </div>
        </div>
      </div>

      {/* Stock List / Table Hybrid Header */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Inventory Matrix ({filteredStock.length})
          </h2>
          <span className="text-[11px] text-slate-400">Tap row for details & timeline</span>
        </div>

        {/* Stock List Rows */}
        <div className="space-y-2.5">
          {filteredStock.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenStockDetail(item)}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-md hover:border-brand-200 dark:hover:border-slate-700 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                {/* Size & Name */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                      {item.size}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      ({item.sqftPerPiece} sq.ft/pc)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[200px]">
                    {item.name}
                  </div>
                </div>

                {/* Status Indicator (Accessible text + color) */}
                <div className="flex items-center gap-2">
                  <StockStatusBadge status={item.status} label={item.statusLabel} />
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-brand-royal dark:group-hover:text-blue-400 transition-all" />
                </div>
              </div>

              {/* Material Breakdown & Merged Total Pill */}
              <div className="mt-3 pt-2.5 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                  <div>
                    <span className="text-slate-400 font-normal text-[11px]">PLY Frame: </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.plyFrame} pcs</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <div>
                    <span className="text-slate-400 font-normal text-[11px]">PLY Pine: </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.plyPine} pcs</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-xs font-mono shadow-inner">
                  Merged: {item.merged} pcs
                </div>
              </div>
            </div>
          ))}

          {filteredStock.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No matching stock found</p>
              <p className="text-xs text-slate-400 mt-1">Try changing the search keyword or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
