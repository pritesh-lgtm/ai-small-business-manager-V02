import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Screens
import { HomeScreen } from './components/home/HomeScreen';
import { StockScreen } from './components/stock/StockScreen';
import { OrdersScreen } from './components/orders/OrdersScreen';
import { StaffScreen } from './components/staff/StaffScreen';
import { MoreScreen } from './components/more/MoreScreen';

// Modals & Drawers
import { StockDetailModal } from './components/stock/StockDetailModal';
import { AddDeductStockModal } from './components/stock/AddDeductStockModal';
import { NewOrderModal } from './components/orders/NewOrderModal';
import { WhatsAppOrderParserModal } from './components/orders/WhatsAppOrderParserModal';
import { DocumentScannerModal } from './components/scanner/DocumentScannerModal';
import { InvoicePreviewModal } from './components/scanner/InvoicePreviewModal';
import { AICopilotDrawer } from './components/ai/AICopilotDrawer';

const MainContent = () => {
  const { activeTab } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'stock':
        return <StockScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'staff':
        return <StaffScreen />;
      case 'more':
        return <MoreScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full">
      {/* App Header */}
      <Header />

      {/* Main Tab Screen Content */}
      <main className="flex-1 overflow-y-auto">
        {renderActiveScreen()}
      </main>

      {/* Bottom 5-Tab Navigation + Floating AI FAB */}
      <BottomNav />

      {/* Toast Alert */}
      <Toast />

      {/* Drawers & Popups */}
      <NotificationDrawer />
      <StockDetailModal />
      <AddDeductStockModal />
      <NewOrderModal />
      <WhatsAppOrderParserModal />
      <DocumentScannerModal />
      <InvoicePreviewModal />
      <AICopilotDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DeviceFrame>
        <MainContent />
      </DeviceFrame>
    </AppProvider>
  );
}
