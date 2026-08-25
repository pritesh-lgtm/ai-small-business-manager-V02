import React, { useState } from 'react';
import { Plus, XCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StaffScreen = () => {
  const { staffList, handleToggleAttendance, handleRecordAdvance, showToast } = useApp();

  const [selectedStaffForAdvance, setSelectedStaffForAdvance] = useState(null);
  const [advanceAmount, setAdvanceAmount] = useState('');

  // Statistics
  const presentCount = staffList.filter(s => s.attendanceToday === 'present' || s.attendanceToday === 'overtime').length;
  const absentCount = staffList.filter(s => s.attendanceToday === 'absent').length;
  const halfDayCount = staffList.filter(s => s.attendanceToday === 'half-day').length;
  const totalDailyWageEstimate = staffList.reduce((sum, s) => {
    if (s.attendanceToday === 'present') return sum + s.dailyWage;
    if (s.attendanceToday === 'overtime') return sum + (s.dailyWage * 1.5);
    if (s.attendanceToday === 'half-day') return sum + (s.dailyWage * 0.5);
    return sum;
  }, 0);

  const handleSendSalarySlip = (staff) => {
    const text = encodeURIComponent(
      `*Monthly Salary Slip — Bharat Wood Works*\n\nStaff: ${staff.name} (${staff.role})\nDays Worked: ${staff.daysWorkedThisMonth} days\nDaily Wage: ₹${staff.dailyWage}\nAdvance Deductions: -₹${staff.advanceTaken}\n------------------------\n*Net Payable: ₹${staff.pendingSalary.toLocaleString('en-IN')}*\n\nStatus: Ready for payout this Saturday.`
    );
    window.open(`https://wa.me/${staff.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast(`WhatsApp Salary Slip sent to ${staff.name}`);
  };

  const handleSaveAdvance = (e) => {
    e.preventDefault();
    if (!selectedStaffForAdvance || !advanceAmount) return;
    handleRecordAdvance(selectedStaffForAdvance.id, advanceAmount);
    setSelectedStaffForAdvance(null);
    setAdvanceAmount('');
  };

  return (
    <div className="space-y-3 px-4 py-2 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Worker Attendance & Salary
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daily wages, piece-rate tracking & WhatsApp slips
          </p>
        </div>

        <button
          onClick={() => showToast('Staff enrollment modal opened')}
          className="px-3 py-2 rounded-xl bg-brand-royal dark:bg-blue-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:bg-brand-800 transition-all flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Worker</span>
        </button>
      </div>

      {/* Daily Attendance Summary 4-Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 text-center">
          <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">Present</div>
          <div className="text-xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5">{presentCount}</div>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200/80 dark:border-amber-800 text-center">
          <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300">Half Day</div>
          <div className="text-xl font-black text-amber-900 dark:text-amber-100 mt-0.5">{halfDayCount}</div>
        </div>

        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200/80 dark:border-rose-800 text-center">
          <div className="text-[10px] font-bold text-rose-800 dark:text-rose-300">Absent</div>
          <div className="text-xl font-black text-rose-900 dark:text-rose-100 mt-0.5">{absentCount}</div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-800 text-center">
          <div className="text-[10px] font-bold text-blue-800 dark:text-blue-300">Wage Today</div>
          <div className="text-xs font-black text-blue-900 dark:text-blue-100 mt-1.5 font-mono">₹{totalDailyWageEstimate}</div>
        </div>
      </div>

      {/* Staff Roster List */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Factory Floor Workers ({staffList.length})
          </h2>
          <span className="text-[11px] text-slate-400">Tap P / HD / A / OT to update</span>
        </div>

        <div className="space-y-3">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft"
            >
              {/* Top row: Avatar, Name, Role & Salary */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white font-black text-sm flex items-center justify-center shadow-md">
                    {staff.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {staff.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {staff.role}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] font-semibold text-brand-royal dark:text-blue-400">
                        {staff.wageType === 'piece-rate' ? `₹${staff.pieceRate}/pc` : `₹${staff.dailyWage}/day`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    ₹{staff.pendingSalary.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">Net Due ({staff.daysWorkedThisMonth} days)</span>
                </div>
              </div>

              {/* Attendance Selector Buttons (P, HD, A, OT) */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'present', label: 'P', color: 'bg-emerald-600 text-white' },
                    { id: 'half-day', label: 'HD', color: 'bg-amber-600 text-white' },
                    { id: 'absent', label: 'A', color: 'bg-rose-600 text-white' },
                    { id: 'overtime', label: 'OT', color: 'bg-indigo-600 text-white' },
                  ].map((btn) => {
                    const isSelected = staff.attendanceToday === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => handleToggleAttendance(staff.id, btn.id)}
                        className={`w-9 h-8 rounded-xl font-extrabold text-xs transition-all ${
                          isSelected
                            ? `${btn.color} shadow-sm ring-2 ring-slate-900 dark:ring-white`
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>

                {/* Actions: Advance & WhatsApp Slip */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedStaffForAdvance(staff)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300"
                  >
                    + Advance
                  </button>

                  <button
                    onClick={() => handleSendSalarySlip(staff)}
                    className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                    title="Send WhatsApp Slip"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advance Payment Modal Sheet */}
      {selectedStaffForAdvance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scaleUp">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Record Advance for {selectedStaffForAdvance.name}
              </h3>
              <button onClick={() => setSelectedStaffForAdvance(null)} className="text-slate-400">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdvance} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Advance Amount (₹)</label>
                <input
                  type="number"
                  required
                  autoFocus
                  placeholder="e.g. 1000"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-base font-bold font-mono mt-1"
                />
              </div>

              <div className="flex gap-1.5">
                {[500, 1000, 2000, 3000].map(amt => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setAdvanceAmount(amt.toString())}
                    className="flex-1 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-royal text-white rounded-xl text-xs font-bold shadow-md"
              >
                Confirm Advance Deduction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
