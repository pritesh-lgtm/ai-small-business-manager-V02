import React, { useState } from 'react';
import { X, Plus, Calculator, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewOrderModal = () => {
  const {
    isNewOrderModalOpen,
    setIsNewOrderModalOpen,
    customersList,
    setCustomersList,
    handleCreateOrder
  } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customersList[0]?.id || '');
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerCity, setNewCustomerCity] = useState('');

  const [material, setMaterial] = useState('PLY Frame');
  const [size, setSize] = useState('80 × 38');
  const [customLength, setCustomLength] = useState('80');
  const [customWidth, setCustomWidth] = useState('38');
  const [quantity, setQuantity] = useState('10');
  const [rate, setRate] = useState('70');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow, 4 PM');
  const [notes, setNotes] = useState('');

  if (!isNewOrderModalOpen) return null;

  const currentCustomer = customersList.find(c => c.id === selectedCustomerId) || customersList[0];

  // Calculate Sq.Ft and Total Price
  const l = parseFloat(customLength) || 80;
  const w = parseFloat(customWidth) || 38;
  const qty = parseInt(quantity, 10) || 1;
  const r = parseFloat(rate) || 70;

  const sqftPerPiece = ((l * w) / 144);
  const totalSqft = sqftPerPiece * qty;
  const totalAmount = Math.round(totalSqft * r);

  const handleSizeChange = (selectedSizeStr) => {
    setSize(selectedSizeStr);
    if (selectedSizeStr === '80 × 38') {
      setCustomLength('80'); setCustomWidth('38');
    } else if (selectedSizeStr === '80 × 37') {
      setCustomLength('80'); setCustomWidth('37');
    } else if (selectedSizeStr === '75 × 35') {
      setCustomLength('75'); setCustomWidth('35');
    } else if (selectedSizeStr === '72 × 30') {
      setCustomLength('72'); setCustomWidth('30');
    } else if (selectedSizeStr === '84 × 40') {
      setCustomLength('84'); setCustomWidth('40');
    } else if (selectedSizeStr === '78 × 36') {
      setCustomLength('78'); setCustomWidth('36');
    }
  };

  const handleAddNewCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;
    const newCust = {
      id: `cust-${Date.now()}`,
      name: newCustomerName.trim(),
      contact: newCustomerName.trim(),
      phone: newCustomerPhone || '+91 98000 00000',
      city: newCustomerCity || 'Ahmedabad',
      balance: 0,
      totalOrders: 1,
    };
    setCustomersList([newCust, ...customersList]);
    setSelectedCustomerId(newCust.id);
    setIsAddingNewCustomer(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    handleCreateOrder({
      customer: currentCustomer.name,
      customerId: currentCustomer.id,
      phone: currentCustomer.phone,
      size: `${l} × ${w}`,
      material,
      quantity: qty,
      rate: r,
      sqft: parseFloat(totalSqft.toFixed(2)),
      total: totalAmount,
      deliveryDate,
      notes,
      source: 'Direct Manual Entry',
    });
    setIsNewOrderModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Create New Order
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant rate & square-feet calculation
            </p>
          </div>
          <button
            onClick={() => setIsNewOrderModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Customer Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Customer / Party
              </label>
              <button
                type="button"
                onClick={() => setIsAddingNewCustomer(!isAddingNewCustomer)}
                className="text-xs font-bold text-brand-royal dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                + New Customer
              </button>
            </div>

            {isAddingNewCustomer ? (
              <div className="p-3 bg-brand-50/60 dark:bg-brand-950/40 rounded-2xl border border-brand-200 dark:border-brand-800 space-y-2">
                <div className="text-xs font-bold text-brand-900 dark:text-brand-300">Add New Party</div>
                <input
                  type="text"
                  placeholder="Business / Shop Name (e.g. Gujarat Ply Mart)"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newCustomerCity}
                    onChange={(e) => setNewCustomerCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewCustomer(false)}
                    className="px-3 py-1 text-xs text-slate-500 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddNewCustomer}
                    className="px-3 py-1 bg-brand-royal text-white rounded-lg text-xs font-bold shadow-sm"
                  >
                    Save Party
                  </button>
                </div>
              </div>
            ) : (
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {customersList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.city} ({c.phone})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Material Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Material Selector
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['PLY Frame', 'PLY Pine', 'Full Pine'].map((mat) => (
                <button
                  type="button"
                  key={mat}
                  onClick={() => setMaterial(mat)}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold border transition-all text-center ${
                    material === mat
                      ? 'bg-brand-royal text-white border-brand-royal shadow-md shadow-brand-500/20'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Size Selector (Inches)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {['80 × 38', '80 × 37', '75 × 35', '72 × 30', '84 × 40', '78 × 36'].map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => handleSizeChange(sz)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    size === sz
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Custom Length & Width inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400">Length (Inch)</span>
                <input
                  type="number"
                  value={customLength}
                  onChange={(e) => setCustomLength(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Width (Inch)</span>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Quantity & Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Quantity (pcs)
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-extrabold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rate (₹ / sq.ft)
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-extrabold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="p-4 bg-gradient-to-br from-slate-900 to-brand-navy text-white rounded-2xl shadow-lg border border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-brand-300" />
                <span>Sq.Ft Rate Breakdown</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">{sqftPerPiece.toFixed(2)} sq.ft/pc</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700">
              <span>Total Area ({qty} pcs × {sqftPerPiece.toFixed(2)}):</span>
              <span className="font-mono font-bold text-white">{totalSqft.toFixed(2)} sq.ft</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="text-xs text-slate-400">Total Order Value</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <span>Inclusive of standard core</span>
              </div>
            </div>
          </div>

          {/* Delivery Date & Notes */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Delivery Date
              </label>
              <input
                type="text"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="e.g. Tomorrow by 4:00 PM"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Special Instructions / Remarks
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Corner protection packing, tempo transport"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer Submit */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSubmitOrder}
            className="w-full py-3 rounded-2xl bg-brand-royal hover:bg-brand-800 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Check className="w-5 h-5" />
            Confirm & Create Order (₹{totalAmount.toLocaleString('en-IN')})
          </button>
        </div>
      </div>
    </div>
  );
};
