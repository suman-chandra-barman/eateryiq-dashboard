/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DeliveryChart } from "@/components/Charts/DeliveryChart";
import PageLoader from "@/components/Shared/PageLoader";
import StatsCard from "@/components/Shared/StatasCard";
import { useGetOperationStatsQuery } from "@/redux/features/stats/statsApi";
import { TrendingUp, Users, DollarSign } from "lucide-react";

const iconMap: Record<string, any> = {
  today_sales: DollarSign,
  staff_attendance: Users,
  labor_cost_vs_budget: DollarSign,
};

export default function OperatorDashboardPage() {
  const { data: operationStatsData, isLoading: isOperationStatsLoading } =
    useGetOperationStatsQuery({});

  // Show loader while data is loading
  if (isOperationStatsLoading) {
    return <PageLoader level="Loading dashboard..." />;
  }

  const kpiCards = operationStatsData?.data?.ui?.kpi_cards || [];
  const chartData = operationStatsData?.data?.ui?.charts?.delivery_performance;

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

        {chartData && <DeliveryChart chartData={chartData} />}
      </div>
    </div>
  );
}
