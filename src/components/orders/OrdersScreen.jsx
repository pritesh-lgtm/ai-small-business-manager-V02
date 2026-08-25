import React, { useState } from 'react';
import { Search, Plus, ShoppingCart, MessageSquare, FileText, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatusBadge } from '../common/StatusBadge';

export const OrdersScreen = () => {
  const {
    ordersList,
    setIsNewOrderModalOpen,
    setIsWhatsAppParserOpen,
    handleUpdateOrderStatus,
    handleViewInvoice,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // All | Pending | Processing | Completed | Cancelled

  const filterTabs = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

  const filteredOrders = ordersList.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.size.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      order.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleSendWhatsApp = (order) => {
    const text = encodeURIComponent(
      `*Order Update from Bharat Wood Works*\n\nOrder ID: ${order.id}\nItems: ${order.quantity} pcs (${order.size} - ${order.material})\nTotal Amount: ₹${order.total.toLocaleString('en-IN')}\nStatus: ${order.status.toUpperCase()}\n\nThank you for doing business with us!`
    );
    window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast(`WhatsApp message drafted for ${order.customer}`);
  };

  return (
    <div className="space-y-3 px-4 py-2 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Orders
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Smart pipeline & AI WhatsApp order processing
          </p>
        </div>

        <button
          onClick={() => setIsNewOrderModalOpen(true)}
          className="px-3 py-2 rounded-xl bg-brand-royal dark:bg-blue-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:bg-brand-800 transition-all flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* AI WhatsApp Order Processing Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl shadow-lg border border-emerald-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-emerald-200 uppercase tracking-wide">
                WhatsApp / Voice AI Parser
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
              Paste raw WhatsApp chat or voice transcript to create order
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppParserOpen(true)}
          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shrink-0 shadow-md transition-all active:scale-95 flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Paste Chat
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customer or order..."
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-soft"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          const count = tab === 'All' ? ordersList.length : ordersList.filter(o => o.status.toLowerCase() === tab.toLowerCase()).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-3 pt-1">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-md transition-all"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {order.customer}
                  </h3>
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                    {order.id}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {order.phone}
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                  ₹{order.total.toLocaleString('en-IN')}
                </div>
                <div className="mt-1">
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            </div>

            {/* Middle specs badge */}
            <div className="my-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white">{order.quantity} pcs</span>
                <span className="text-slate-400 mx-1.5">×</span>
                <span className="font-bold text-brand-royal dark:text-blue-400 font-mono">{order.size}</span>
                <span className="text-slate-400 ml-1.5">({order.material})</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                Rate: ₹{order.rate}/sq.ft
              </div>
            </div>

            {/* Notes if any */}
            {order.notes && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mb-3">
                “{order.notes}”
              </p>
            )}

            {/* Bottom Actions Row */}
            <div className="pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSendWhatsApp(order)}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="WhatsApp Update"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="text-[11px]">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleViewInvoice(order)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Generate Invoice / PDF"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Invoice</span>
                </button>
              </div>

              {/* Status Selector dropdown */}
              <div className="flex items-center gap-1">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                  className="px-2 py-1 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="pending">Mark Pending</option>
                  <option value="processing">Mark Processing</option>
                  <option value="completed">Mark Completed</option>
                  <option value="cancelled">Mark Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <ShoppingCart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No orders in this filter</p>
            <button
              onClick={() => setIsNewOrderModalOpen(true)}
              className="mt-3 px-4 py-2 bg-brand-royal text-white rounded-xl text-xs font-bold shadow-sm"
            >
              + Create New Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
