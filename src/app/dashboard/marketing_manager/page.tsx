/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SalesVsTargetChart } from "@/components/Charts/SalesVsTargetChart";
import StatsCard from "@/components/Shared/StatasCard";
import { useGetMarketingStatsQuery } from "@/redux/features/stats/statsApi";
import {
  TrendingUp,
  Users,
  DollarSign,
  Smile,
  TrendingDown,
} from "lucide-react";
import AIThinkingIndicatorSkeleton from "@/components/Skeletons/AIThinkingIndicatorSkeleton";

const iconMap: Record<string, any> = {
  today_sales: DollarSign,
  staff_attendance: Users,
  labor_cost_vs_budget: DollarSign,
  weekly_sales: DollarSign,
  customer_satisfaction: Smile,
  cost_efficiency: TrendingDown,
};

export default function MarketingManagerDashboardPage() {
  const { data: marketingStatsData, isLoading: isMarketingStatsLoading } =
    useGetMarketingStatsQuery({});

  // Show loader while data is loading
  if (isMarketingStatsLoading)
    return <AIThinkingIndicatorSkeleton title="AI is generating..." />;

  const kpiCards = marketingStatsData?.data?.ui?.kpi_cards || [];
  const charts = marketingStatsData?.data?.ui?.charts || {};


  return (
    <div>
      <h1 className="text-3xl font-medium text-[#3B3B3B] mb-4">Dashboard</h1>
      <div className="p-4 bg-white my-4 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {kpiCards.map((card: any) => (
            <StatsCard
              key={card.key}
              title={card.title}
              value={card.value}
              change={card.compare.display}
              trend={card.compare.direction}
              icon={iconMap[card.key] || TrendingUp}
            />
          ))}
        </div>

        <SalesVsTargetChart key="sales_vs_target" chartData={charts.sales_vs_target} />;
      </div>
    </div>
  );
}
