import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, Send, Bot, MessageSquare, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { aiPromptsList } from '../../data/mockData';

export const AICopilotDrawer = () => {
  const {
    isAiDrawerOpen,
    setIsAiDrawerOpen,
    aiInitialQuery,
    setAiInitialQuery,
    customersList,
    stockList,
    todaySales,
    outstandingPayments,
    setActiveTab,
    handleOpenStockDetail,
    showToast
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste Bharat Bhai! 🙏 I am your Vyapar AI Assistant. Ask me anything about your stock, pending orders, worker attendance, or outstanding customer payments.',
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback((queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      time: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let actionButtons = null;

      const lower = q.toLowerCase();

      if (lower.includes('payment') || lower.includes('overdue') || lower.includes('balance') || lower.includes('khata')) {
        const topDebtor = [...customersList].sort((a, b) => b.balance - a.balance)[0];
        aiResponseText = `📊 Outstanding Payment Summary:\n• Total Outstanding: ₹${outstandingPayments.toLocaleString('en-IN')}\n• Highest Balance: ${topDebtor.name} (₹${topDebtor.balance.toLocaleString('en-IN')})\n• Patel Traders: ₹18,240 (Due for today's order)\n\nWould you like me to send a polite Gujarati/Hindi WhatsApp reminder to ${topDebtor.name}?`;
        actionButtons = (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                const text = encodeURIComponent(`Jai Shree Krishna ${topDebtor.name}. Gentle reminder regarding pending balance of ₹${topDebtor.balance.toLocaleString('en-IN')}. Please arrange payment. - Bharat Wood Works`);
                window.open(`https://wa.me/${topDebtor.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                showToast(`WhatsApp reminder opened for ${topDebtor.name}`);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Send WhatsApp Reminder to {topDebtor.name.split(' ')[0]}
            </button>
          </div>
        );
      } else if (lower.includes('stock') || lower.includes('low') || lower.includes('production') || lower.includes('80x38') || lower.includes('80 × 38')) {
        aiResponseText = `📦 Stock Health & Production Recommendation:\n• 80 × 38 has 30 pcs merged stock (20 available to sell, 6 in pressing).\n• 75 × 35 is critically low (2 pcs left).\n• 84 × 40 is depleted (0 pcs in stock).\n\n💡 AI Recommendation: Shift Press line #2 to 80×38 & 75×35 batches today.`;
        actionButtons = (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                const item = stockList.find(s => s.size === '80 × 38') || stockList[0];
                handleOpenStockDetail(item);
                setIsAiDrawerOpen(false);
                setActiveTab('stock');
              }}
              className="px-3 py-1.5 bg-brand-royal hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              Inspect 80 × 38 Stock
            </button>
          </div>
        );
      } else if (lower.includes('sales') || lower.includes('summary') || lower.includes('profit') || lower.includes('today')) {
        aiResponseText = `📈 Today's Operations Overview:\n• Gross Sales: ₹${todaySales.toLocaleString('en-IN')} (+14% above weekly avg)\n• Active Orders: 18 Total (7 Completed, 5 In Pressing, 6 Pending)\n• Factory Floor: 4 Workers Present, 1 Half-day, 1 Absent.\n• Estimated Gross Margin: 28.5%`;
      } else {
        aiResponseText = `I have analyzed your business records for "${q}". Everything is synced across your raw material godown, pressing line, and customer khata accounts.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          time: 'Just now',
          actionButtons,
        },
      ]);
      setIsTyping(false);
    }, 700);
  }, [inputQuery, customersList, outstandingPayments, stockList, todaySales, handleOpenStockDetail, setIsAiDrawerOpen, setActiveTab, showToast]);

  // Handle initial prompt query cleanly
  useEffect(() => {
    if (aiInitialQuery) {
      const timer = setTimeout(() => {
        handleSend(aiInitialQuery);
        setAiInitialQuery('');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [aiInitialQuery, handleSend, setAiInitialQuery]);

  if (!isAiDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-md animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-lg bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-700 text-white max-h-[92vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-gradient-to-r from-ai-900/60 via-slate-900 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ai-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-ai-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight">
                  Vyapar AI Copilot
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-ai-500/20 text-ai-300 border border-ai-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ask anything about your business in English / Hindi
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/70 border-b border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
          {aiPromptsList.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSend(p.query)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-ai-900/50 hover:border-ai-500/50 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-ai-400 shrink-0" />
              {p.title}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-ai-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-royal text-white rounded-br-none shadow-md'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{m.text}</div>
                {m.actionButtons}
                <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-ai-400 p-2 bg-slate-800/40 rounded-2xl w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing business database...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. Patelji kitna baki hai? Or stock update..."
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-ai-500/40"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-2xl bg-gradient-to-tr from-ai-600 to-indigo-600 hover:from-ai-500 hover:to-indigo-500 text-white shadow-md disabled:opacity-40 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
