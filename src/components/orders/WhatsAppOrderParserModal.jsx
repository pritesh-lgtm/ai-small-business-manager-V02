import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, CheckCircle2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleWhatsAppMessages } from '../../data/mockData';

export const WhatsAppOrderParserModal = () => {
  const {
    isWhatsAppParserOpen,
    setIsWhatsAppParserOpen,
    handleCreateOrder,
    showToast
  } = useApp();

  const [inputChatText, setInputChatText] = useState(sampleWhatsAppMessages[0].text);
  const [extractedData, setExtractedData] = useState(sampleWhatsAppMessages[0].parsed);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isWhatsAppParserOpen) return null;

  const handleSelectSample = (sample) => {
    setInputChatText(sample.text);
    setIsAnalyzing(true);
    setTimeout(() => {
      setExtractedData(sample.parsed);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleManualParse = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Basic heuristic parser for demonstration
      const isPine = inputChatText.toLowerCase().includes('pine');
      const isFullPine = inputChatText.toLowerCase().includes('full pine');
      const material = isFullPine ? 'Full Pine' : (isPine ? 'PLY Pine' : 'PLY Frame');

      // extract quantity
      const qtyMatch = inputChatText.match(/(\d+)\s*(piece|pcs|pieces)/i);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 12;

      // extract size
      const sizeMatch = inputChatText.match(/(\d{2})\s*[xX*×]\s*(\d{2})/);
      const size = sizeMatch ? `${sizeMatch[1]} × ${sizeMatch[2]}` : '80 × 38';

      // extract rate
      const rateMatch = inputChatText.match(/rate\s*(\d+)/i) || inputChatText.match(/@\s*(\d+)/);
      const rate = rateMatch ? parseInt(rateMatch[1], 10) : 70;

      // customer
      let customer = 'Patel Traders';
      if (inputChatText.toLowerCase().includes('rajesh') || inputChatText.toLowerCase().includes('r k')) customer = 'R K Enterprises';
      if (inputChatText.toLowerCase().includes('mahalaxmi')) customer = 'Mahalaxmi Timber';

      setExtractedData({
        customer,
        size,
        material,
        quantity: qty,
        rate,
        confidence: 96,
      });
      setIsAnalyzing(false);
      showToast('AI successfully extracted order details!');
    }, 600);
  };

  const handleConfirmOrder = () => {
    const l = 80;
    const w = 38;
    const sqft = ((l * w) / 144) * extractedData.quantity;
    const total = Math.round(sqft * extractedData.rate);

    handleCreateOrder({
      customer: extractedData.customer,
      phone: '+91 98250 11223',
      size: extractedData.size,
      material: extractedData.material,
      quantity: extractedData.quantity,
      rate: extractedData.rate,
      sqft: parseFloat(sqft.toFixed(2)),
      total,
      notes: `Imported via WhatsApp AI: "${inputChatText.slice(0, 60)}..."`,
      source: 'WhatsApp AI',
    });

    setIsWhatsAppParserOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                WhatsApp / AI Order Parser
                <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Converts messy Hindi/Hinglish WhatsApp chats into structured orders
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppParserOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Preset Sample Quick Buttons */}
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              Quick Test Examples:
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {sampleWhatsAppMessages.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
                >
                  {sample.sender.split(' ')[0]} ({sample.parsed.size})
                </button>
              ))}
            </div>
          </div>

          {/* Raw Chat Text Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Raw WhatsApp Message or Voice Transcript
            </label>
            <textarea
              rows={4}
              value={inputChatText}
              onChange={(e) => setInputChatText(e.target.value)}
              placeholder="Paste WhatsApp chat here e.g. Patelji: Bhai 15 piece 80x38 PLY Frame rate 70 urgent dispatch karo..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            ></textarea>

            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={handleManualParse}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-700 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAnalyzing ? 'Extracting with AI...' : 'Re-analyze Text'}
              </button>
            </div>
          </div>

          {/* Extracted Structured Entity Card */}
          {extractedData && (
            <div className="p-4 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 text-white rounded-2xl shadow-lg border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-800/60">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    AI Extraction Recognized
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  {extractedData.confidence}% Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Customer</span>
                  <span className="font-bold text-slate-100">{extractedData.customer}</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Size (Inches)</span>
                  <span className="font-bold text-amber-300 font-mono">{extractedData.size}</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Material</span>
                  <span className="font-bold text-slate-100">{extractedData.material}</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Quantity</span>
                  <span className="font-bold text-emerald-300">{extractedData.quantity} pcs</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Rate / Sq.Ft</span>
                  <span className="font-bold text-slate-100">₹{extractedData.rate}</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Est. Total</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ₹{Math.round(((80*38)/144) * extractedData.quantity * extractedData.rate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleConfirmOrder}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Check className="w-5 h-5" />
            Convert to Confirmed Order in 1-Click
          </button>
        </div>
      </div>
    </div>
  );
};
