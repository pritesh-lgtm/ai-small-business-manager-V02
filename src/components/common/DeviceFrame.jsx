import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Moon, Sun, Wifi, Battery, Signal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeviceFrame = ({ children }) => {
  const { deviceMode, setDeviceMode, isDarkMode, setIsDarkMode } = useApp();
  const [currentTime, setCurrentTime] = useState('19:20');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 flex flex-col items-center justify-start transition-colors duration-200">
      {/* Top Floating Control Bar for Demo / Pairing Presentation */}
      <header className="w-full max-w-4xl py-2 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-royal text-white flex items-center justify-center font-black text-xs shadow-md">
            VA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                VyaparAI Mobile
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Figma 1:1 Live
              </span>
            </div>
          </div>
        </div>

        {/* View Controls & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* Mobile vs Fullscreen Toggle */}
          <div className="flex bg-white dark:bg-slate-900 rounded-xl p-0.5 shadow-sm border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-brand-royal text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Android Phone Mockup Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Frame</span>
            </button>

            <button
              onClick={() => setDeviceMode('responsive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-brand-royal text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Full Responsive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            title="Toggle Light / Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Main View Container */}
      <main className="w-full flex justify-center items-start pb-6 px-0 sm:px-4">
        {deviceMode === 'mobile' ? (
          /* Realistic Android Smartphone Shell */
          <div className="relative w-full max-w-[412px] min-h-[860px] bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-slate-800 ring-1 ring-slate-950/20">
            {/* Camera Punch Hole */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-950 rounded-full z-50 border border-slate-800/80"></div>

            {/* Android Screen Container */}
            <div className="relative w-full min-h-[820px] bg-slate-50 dark:bg-slate-950 rounded-[34px] overflow-hidden flex flex-col shadow-inner">
              {/* Android Status Bar */}
              <div className="h-9 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 z-40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
                <span className="font-mono text-[11px] font-bold">{currentTime}</span>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              {/* App Viewport */}
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                {children}
              </div>

              {/* Android Navigation Pill Bar */}
              <div className="h-4 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-40">
                <div className="w-28 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Responsive Screen View */
          <div className="w-full max-w-md bg-slate-50 dark:bg-slate-950 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col min-h-[820px]">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
