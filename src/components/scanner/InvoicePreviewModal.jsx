import React, { useRef } from 'react';
import { X, Printer, Download, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InvoicePreviewModal = () => {
  const {
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    selectedInvoiceOrder,
    profile,
    showToast
  } = useApp();

  const printRef = useRef();

  if (!isInvoiceModalOpen || !selectedInvoiceOrder) return null;

  const order = selectedInvoiceOrder;
  const taxableAmount = Math.round(order.total / 1.18);
  const gstAmount = order.total - taxableAmount;
  const cgst = Math.round(gstAmount / 2);
  const sgst = Math.round(gstAmount / 2);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `*Tax Invoice from ${profile.businessName}*\n\nInvoice No: INV-${order.id}\nCustomer: ${order.customer}\nTotal Amount: ₹${order.total.toLocaleString('en-IN')}\nStatus: ${order.paymentStatus}\n\nThank you for your business!`
    );
    window.open(`https://wa.me/${order.phone?.replace(/[^0-9]/g, '') || ''}?text=${text}`, '_blank');
    showToast('Invoice shared on WhatsApp');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/70 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[94vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Tax Invoice Preview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              GST Compliant Tax Invoice & Delivery Memo
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Viewport */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950/50 custom-scrollbar">
          <div ref={printRef} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            {/* Header / Business details */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-base font-black text-brand-royal dark:text-blue-400 tracking-tight">
                  {profile.businessName}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5 max-w-[260px] leading-relaxed">
                  {profile.address}
                </p>
                <div className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                  GSTIN: <span className="font-mono font-bold text-slate-900 dark:text-white">{profile.gstin}</span>
                </div>
                <div className="text-slate-500">Phone: {profile.phone}</div>
              </div>

              <div className="text-right">
                <div className="px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950 text-brand-royal dark:text-blue-300 font-extrabold text-xs inline-block mb-1">
                  TAX INVOICE
                </div>
                <div className="font-mono font-bold text-slate-900 dark:text-white">
                  INV-{order.id}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">{order.date}</div>
              </div>
            </div>

            {/* Billed To / Buyer details */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Billed To (Buyer):</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5">{order.customer}</div>
                <div className="text-slate-500">{order.phone}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Payment Status:</span>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{order.paymentStatus}</div>
                <div className="text-slate-500">UPI: {profile.upiId}</div>
              </div>
            </div>

            {/* Item Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-center">HSN</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Rate/Sq.Ft</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  <tr>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900 dark:text-white">{order.size} Flush Door Core</div>
                      <div className="text-[11px] text-slate-400">{order.material} (Total {order.sqft} sq.ft)</div>
                    </td>
                    <td className="p-2.5 text-center font-mono">4412</td>
                    <td className="p-2.5 text-center font-bold">{order.quantity} pcs</td>
                    <td className="p-2.5 text-right font-mono">₹{order.rate}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900 dark:text-white font-mono">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tax Breakdown & Totals */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1.5 text-right text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Taxable Amount:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">₹{taxableAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>CGST (9%):</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>SGST (9%):</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Grand Total:</span>
                  <span className="font-mono text-brand-royal dark:text-blue-400">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-6 flex justify-between items-end border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <div>
                <p>Computer generated invoice.</p>
                <p>Valid for GST input tax credit.</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 dark:text-slate-200">{profile.ownerName}</div>
                <p>Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Share on WhatsApp
          </button>

          <button
            onClick={() => showToast('PDF downloaded to device!')}
            className="flex-1 py-3 rounded-2xl bg-brand-royal hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
