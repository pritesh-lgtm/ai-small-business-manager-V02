import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialBusinessProfile,
  initialStockList,
  initialOrders,
  initialStaffList,
  initialCustomers,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState('home'); // home | stock | orders | staff | more
  const [deviceMode, setDeviceMode] = useState('mobile'); // mobile | responsive
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // en | hi | gu

  // Business Data
  const [profile, setProfile] = useState(initialBusinessProfile);
  const [stockList, setStockList] = useState(initialStockList);
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [staffList, setStaffList] = useState(initialStaffList);
  const [customersList, setCustomersList] = useState(initialCustomers);
  const [selectedStockItem, setSelectedStockItem] = useState(initialStockList[0]);

  // Modals & Drawers
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState('');
  const [isStockDetailOpen, setIsStockDetailOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [stockModalMode, setStockModalMode] = useState('add'); // 'add' | 'deduct'
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isWhatsAppParserOpen, setIsWhatsAppParserOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(initialOrders[0]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync Dark Mode class to root HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Low Stock Alert',
      message: '75 × 35 is running low (2 pcs left). Urgent pressing needed.',
      time: '10m ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'WhatsApp Order Received',
      message: 'New order draft created for Patel Traders (₹18,240).',
      time: '1h ago',
      read: false,
      type: 'order',
    },
    {
      id: 'n3',
      title: 'Payment Reminder',
      message: 'Mahalaxmi Timber balance ₹61,260 overdue by 12 days.',
      time: '3h ago',
      read: true,
      type: 'payment',
    },
  ]);

  // Derived Business Metrics
  const lowStockItems = stockList.filter(item => item.status === 'low' || item.status === 'out');
  const totalStockCount = stockList.reduce((sum, item) => sum + item.merged, 0);
  const pendingOrdersCount = ordersList.filter(o => o.status === 'pending').length;
  const processingOrdersCount = ordersList.filter(o => o.status === 'processing').length;
  const completedOrdersCount = ordersList.filter(o => o.status === 'completed').length;
  const totalOrdersCount = ordersList.length;
  const todaySales = ordersList.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const outstandingPayments = customersList.reduce((sum, c) => sum + c.balance, 0);

  // Stock Actions
  const handleOpenStockDetail = (item) => {
    setSelectedStockItem(item);
    setIsStockDetailOpen(true);
  };

  const handleStockAdjustment = (itemId, { materialType, amount, reason, actionType = 'add' }) => {
    const qty = parseInt(amount, 10);
    if (isNaN(qty) || qty <= 0) return;

    setStockList(prev => prev.map(item => {
      if (item.id !== itemId) return item;

      let newPlyFrame = item.plyFrame;
      let newPlyPine = item.plyPine;
      let newFullPine = item.fullPine;
      let inPressing = item.inPressing;

      if (actionType === 'add') {
        if (materialType === 'PLY Frame') newPlyFrame += qty;
        else if (materialType === 'PLY Pine') newPlyPine += qty;
        else if (materialType === 'Full Pine') newFullPine += qty;
      } else if (actionType === 'deduct') {
        if (materialType === 'PLY Frame') newPlyFrame = Math.max(0, newPlyFrame - qty);
        else if (materialType === 'PLY Pine') newPlyPine = Math.max(0, newPlyPine - qty);
        else if (materialType === 'Full Pine') newFullPine = Math.max(0, newFullPine - qty);
      } else if (actionType === 'press') {
        inPressing += qty;
      }

      const newMerged = newPlyFrame + newPlyPine + newFullPine;
      let newStatus = 'healthy';
      let newStatusLabel = 'Healthy';

      if (newMerged === 0) {
        newStatus = 'out';
        newStatusLabel = 'Out of Stock';
      } else if (newMerged <= item.minThreshold / 2) {
        newStatus = 'low';
        newStatusLabel = 'Low Stock';
      } else if (newMerged <= item.minThreshold) {
        newStatus = 'medium';
        newStatusLabel = 'Medium';
      }

      const newAvailable = Math.max(0, newMerged - item.reserved);

      const newTimelineEntry = {
        id: `t-${Date.now()}`,
        action: `${actionType === 'add' ? '+' : '-'}${qty} pcs ${materialType} (${reason || 'Manual Update'})`,
        timestamp: 'Just now',
        type: actionType,
        user: profile.ownerName,
      };

      const updated = {
        ...item,
        plyFrame: newPlyFrame,
        plyPine: newPlyPine,
        fullPine: newFullPine,
        merged: newMerged,
        inPressing,
        availableToSell: newAvailable,
        status: newStatus,
        statusLabel: newStatusLabel,
        timeline: [newTimelineEntry, ...item.timeline],
      };

      if (selectedStockItem && selectedStockItem.id === itemId) {
        setSelectedStockItem(updated);
      }
      return updated;
    }));

    showToast(`Stock updated: ${actionType === 'add' ? '+' : '-'}${qty} pcs ${materialType}`);
  };

  // Order Actions
  const handleCreateOrder = (newOrderData) => {
    const orderId = `ORD-${1049 + ordersList.length}`;
    const newOrder = {
      id: orderId,
      customer: newOrderData.customer,
      customerId: newOrderData.customerId || 'cust-custom',
      phone: newOrderData.phone || '+91 98000 00000',
      size: newOrderData.size || '80 × 38',
      material: newOrderData.material || 'PLY Frame',
      quantity: Number(newOrderData.quantity) || 1,
      rate: Number(newOrderData.rate) || 70,
      sqft: Number(newOrderData.sqft) || 21.11,
      total: Number(newOrderData.total) || 1500,
      status: 'pending',
      date: 'Today, Just now',
      deliveryDate: newOrderData.deliveryDate || 'Tomorrow',
      paymentStatus: newOrderData.paymentStatus || 'Unpaid',
      source: newOrderData.source || 'Manual App',
      notes: newOrderData.notes || '',
    };

    setOrdersList([newOrder, ...ordersList]);
    showToast(`New Order ${orderId} created for ${newOrder.customer}!`);
    return newOrder;
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} updated to ${newStatus.toUpperCase()}`);
  };

  // Staff Attendance Actions
  const handleToggleAttendance = (staffId, status) => {
    setStaffList(prev => prev.map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          attendanceToday: status,
          checkInTime: status === 'absent' ? '-' : (staff.checkInTime === '-' ? '08:30 AM' : staff.checkInTime),
        };
      }
      return staff;
    }));
    showToast(`Attendance updated: ${status.toUpperCase()}`);
  };

  const handleRecordAdvance = (staffId, amount) => {
    const advanceVal = Number(amount);
    if (isNaN(advanceVal) || advanceVal <= 0) return;

    setStaffList(prev => prev.map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          advanceTaken: staff.advanceTaken + advanceVal,
          pendingSalary: Math.max(0, staff.pendingSalary - advanceVal),
        };
      }
      return staff;
    }));
    showToast(`Recorded Advance of ₹${advanceVal.toLocaleString('en-IN')}`);
  };

  // Invoice & PDF Preview
  const handleViewInvoice = (order) => {
    setSelectedInvoiceOrder(order);
    setIsInvoiceModalOpen(true);
  };

  // Open Ask AI Copilot with prompt
  const openAskAi = (promptText = '') => {
    setAiInitialQuery(promptText);
    setIsAiDrawerOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        deviceMode,
        setDeviceMode,
        isDarkMode,
        setIsDarkMode,
        language,
        setLanguage,
        profile,
        setProfile,
        stockList,
        setStockList,
        ordersList,
        setOrdersList,
        staffList,
        setStaffList,
        customersList,
        setCustomersList,
        selectedStockItem,
        setSelectedStockItem,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        aiInitialQuery,
        setAiInitialQuery,
        isStockDetailOpen,
        setIsStockDetailOpen,
        isAddStockModalOpen,
        setIsAddStockModalOpen,
        stockModalMode,
        setStockModalMode,
        isNewOrderModalOpen,
        setIsNewOrderModalOpen,
        isWhatsAppParserOpen,
        setIsWhatsAppParserOpen,
        isScannerModalOpen,
        setIsScannerModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        selectedInvoiceOrder,
        setSelectedInvoiceOrder,
        isNotificationsOpen,
        setIsNotificationsOpen,
        notifications,
        setNotifications,
        toast,
        showToast,
        todaySales,
        outstandingPayments,
        lowStockItems,
        totalStockCount,
        pendingOrdersCount,
        processingOrdersCount,
        completedOrdersCount,
        totalOrdersCount,
        handleOpenStockDetail,
        handleStockAdjustment,
        handleCreateOrder,
        handleUpdateOrderStatus,
        handleToggleAttendance,
        handleRecordAdvance,
        handleViewInvoice,
        openAskAi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
