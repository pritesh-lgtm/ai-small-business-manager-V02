import React from 'react';
import {
  CreditCard,
  FileText,
  Languages,
  Moon,
  Sun,
  Building,
  MessageSquare,
  Download,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MoreScreen = () => {
  const {
    profile,
    customersList,
    outstandingPayments,
    isDarkMode,
    setIsDarkMode,
    language,
    setLanguage,
    setIsInvoiceModalOpen,
    setIsScannerModalOpen,
    openAskAi,
    showToast
  } = useApp();

  const handleSendStatement = (customer) => {
    const text = encodeURIComponent(
      `*Account Statement from Bharat Wood Works*\n\nParty: ${customer.name}\nCity: ${customer.city}\nTotal Past Orders: ${customer.totalOrders}\nPending Balance: ₹${customer.balance.toLocaleString('en-IN')}\n\nPlease verify and clear the balance at your earliest convenience. UPI: ${profile.upiId}`
    );
    window.open(`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast(`WhatsApp Statement sent to ${customer.name}`);
  };

  return (
    <div className="space-y-4 px-4 py-2 pb-24 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          More & Business Tools
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Payment khata, GST settings, and regional preferences
        </p>
      </div>

      {/* Customer Khata & Ledger Card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Customer Khata & Balance
              </h2>
              <span className="text-[11px] text-slate-400">Outstanding: ₹{outstandingPayments.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button
            onClick={() => openAskAi("Give me a full recovery report for all pending customer balances")}
            className="px-2.5 py-1 rounded-xl bg-ai-50 dark:bg-ai-950 text-ai-600 dark:text-ai-300 text-xs font-bold flex items-center gap-1 border border-ai-200 dark:border-ai-800"
          >
            <Sparkles className="w-3 h-3 text-ai-500" />
            AI Audit
          </button>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          {customersList.map((c) => (
            <div
              key={c.id}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</div>
                <div className="text-[11px] text-slate-400">{c.city} • {c.phone}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className={`text-xs font-extrabold font-mono ${c.balance > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600'}`}>
                    ₹{c.balance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400">{c.totalOrders} Orders</div>
                </div>

                {c.balance > 0 && (
                  <button
                    onClick={() => handleSendStatement(c)}
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 text-emerald-600"
                    title="Send Statement on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tools Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsScannerModalOpen(true)}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft text-left hover:border-brand-300 transition-all group"
        >
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 w-fit mb-2 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">AI OCR Scanner</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Scan bills & delivery slips</p>
        </button>

        <button
          onClick={() => setIsInvoiceModalOpen(true)}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft text-left hover:border-brand-300 transition-all group"
        >
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 w-fit mb-2 group-hover:scale-110 transition-transform">
            <Download className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">GST Invoices</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Generate compliant PDF bills</p>
        </button>
      </div>

      {/* Preferences & System Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft divide-y divide-slate-100 dark:divide-slate-800">
        {/* Language Selector */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">App Language</div>
              <div className="text-[11px] text-slate-400">English / हिंदी / ગુજરાતી</div>
            </div>
          </div>

          <div className="flex gap-1">
            {[
              { id: 'en', label: 'English' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'gu', label: 'ગુજરાતી' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  setLanguage(lang.id);
                  showToast(`Language switched to ${lang.label}`);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  language === lang.id
                    ? 'bg-brand-royal text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode Switch */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</div>
              <div className="text-[11px] text-slate-400">High contrast factory theme</div>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Business Profile Summary */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{profile.businessName}</div>
              <div className="text-[11px] text-slate-400">GSTIN: {profile.gstin}</div>
            </div>
          </div>

          <span className="text-xs font-bold text-brand-royal dark:text-blue-400">Edit</span>
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center py-2 text-[11px] text-slate-400 space-y-0.5">
        <p className="font-semibold text-slate-500 dark:text-slate-400">VyaparAI Enterprise v2.4 (Android & Web)</p>
        <p>Engineered for Indian Small Businesses & Manufacturers</p>
      </div>
    </div>
  );
};
