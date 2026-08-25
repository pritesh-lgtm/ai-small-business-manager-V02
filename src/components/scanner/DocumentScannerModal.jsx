import React, { useState } from 'react';
import { X, Camera, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleScannerDocs } from '../../data/mockData';

export const DocumentScannerModal = () => {
  const {
    isScannerModalOpen,
    setIsScannerModalOpen,
    handleStockAdjustment,
    showToast
  } = useApp();

  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  if (!isScannerModalOpen) return null;

  const currentDoc = sampleScannerDocs[selectedDocIndex];

  const handleTriggerScan = (index) => {
    setSelectedDocIndex(index);
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      showToast('OCR extracted all items with 98.4% confidence!');
    }, 1200);
  };

  const handleImportToStock = () => {
    handleStockAdjustment('stock-1', {
      materialType: 'PLY Frame',
      amount: 40,
      reason: `Auto OCR Imported from ${currentDoc.title}`,
      actionType: 'add',
    });
    setIsScannerModalOpen(false);
    showToast('Items successfully imported into Stock Inventory!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-lg bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-700 text-white max-h-[92vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-ai-500/20 text-ai-300 border border-ai-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                AI Photo / Document Scanner
                <Sparkles className="w-4 h-4 text-ai-400 animate-spin" />
              </h2>
              <p className="text-xs text-slate-400">
                Scan purchase bills, delivery challans & handwritten slips
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsScannerModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Sample Switcher */}
          <div className="flex gap-2">
            {sampleScannerDocs.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => handleTriggerScan(idx)}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-left truncate ${
                  selectedDocIndex === idx
                    ? 'bg-ai-600 text-white border-ai-400 shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                📄 {doc.type}
              </button>
            ))}
          </div>

          {/* Scanner Viewport Simulation with Scanning Laser Line */}
          <div className="relative rounded-2xl bg-slate-950 border-2 border-dashed border-ai-500/50 p-4 min-h-[220px] overflow-hidden flex flex-col justify-between">
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanLaser z-30"></div>
            )}

            {/* Simulated Document Preview Background */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  {currentDoc.supplier}
                </span>
                <span className="text-[10px] text-slate-400">{currentDoc.date}</span>
              </div>

              {/* OCR Recognized Boxes */}
              <div className="relative py-4">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/40 space-y-2 font-mono text-xs">
                  {currentDoc.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-200">
                      <span>• {item.name}</span>
                      <span className="text-emerald-400 font-bold">{item.qty}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="text-amber-400">₹{currentDoc.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Floating OCR Tag */}
                <div className="absolute top-0 right-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  OCR Verified {currentDoc.confidence}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 text-center">
              Target camera at invoice • Auto-straightening & character recognition active
            </div>
          </div>

          {/* Extracted Action Summary */}
          {scanComplete && (
            <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Target Inventory:</span>
                <span className="text-emerald-400 font-bold">80 × 38 PLY Frame (+40 sets)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clicking confirm will automatically update your godown stock ledger and log the purchase invoice.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={handleImportToStock}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-ai-600 to-indigo-600 hover:from-ai-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-ai-600/30 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Check className="w-5 h-5" />
            Add Extracted Items to Stock (+40 pcs)
          </button>
        </div>
      </div>
    </div>
  );
};
