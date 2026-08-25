import React from 'react';
import { BusinessHealthCards } from './BusinessHealthCards';
import { QuickActions } from './QuickActions';
import { TodayBusinessGrid } from './TodayBusinessGrid';
import { AIInsightCard } from './AIInsightCard';
import { RecentOrdersList } from './RecentOrdersList';

export const HomeScreen = () => {
  return (
    <div className="space-y-3 pb-8 animate-fadeIn">
      {/* 1. Business Health Carousel */}
      <BusinessHealthCards />

      {/* 2. Quick Actions */}
      <QuickActions />

      {/* 3. Today's Business Grid */}
      <TodayBusinessGrid />

      {/* 4. AI Insight Card */}
      <AIInsightCard />

      {/* 5. Recent Orders */}
      <RecentOrdersList />
    </div>
  );
};
