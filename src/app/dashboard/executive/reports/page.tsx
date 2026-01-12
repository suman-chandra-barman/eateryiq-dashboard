"use client";

import { DailyOperationsChart } from "@/components/Reports/DailyOperationsChart";
import { OperationsTable } from "@/components/Reports/OperationsTable";
import { StatsCard } from "@/components/Reports/StatsCard";
import { WeeklySalesChart } from "@/components/Reports/WeeklySalesCart";
import AIThinkingIndicatorSkeleton from "@/components/Skeletons/AIThinkingIndicatorSkeleton";
import { useGetExecutiveReportsQuery } from "@/redux/features/reports/reportsApi";
import {
  TrendingUp,
  CheckCircle,
  Truck,
  Users,
  LucideIcon,
} from "lucide-react";

interface CardData {
  key: string;
  title: string;
  value: {
    raw: number;
    formatted: string;
  };
  compare: {
    label: string;
    value: number;
    display: string;
    direction: "up" | "down";
  };
}

interface StatsData {
  title: string;
  value: {
    raw: number;
    formatted: string;
  };
  compare: {
    label: string;
    value: number;
    display: string;
    direction: "up" | "down";
  };
  icon: LucideIcon;
}

export default function ReportsPage() {
  const { data: executiveReportsData, isLoading: isExecutiveReportsLoading } =
    useGetExecutiveReportsQuery({});

  // Map icon keys to actual icon components
  const iconMap: Record<string, LucideIcon> = {
    today_sales: TrendingUp,
    order_completed: CheckCircle,
    delivery_on_time_rate: Truck,
    shift_attendance: Users,
  };

  // Get stats data from API or use defaults
  const statsData: StatsData[] =
    executiveReportsData?.data?.ui?.cards?.map((card: CardData) => ({
      title: card.title,
      value: card.value,
      compare: card.compare,
      icon: iconMap[card.key] || TrendingUp,
    })) || [];

  // Show loader while data is loading
  if (isExecutiveReportsLoading) return <AIThinkingIndicatorSkeleton title="AI is generating..." />;


  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-medium text-[#3B3B3B] mb-4">Reports</h1>
      <div className="flex-1 p-4 bg-white rounded-2xl">
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Stats Cards - 2x2 Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statsData.map((stat: StatsData, index: number) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>
            </div>

            {/* Daily Operations Breakdown Chart */}
            <div className="lg:col-span-1">
              <DailyOperationsChart
                data={executiveReportsData?.data?.ui?.breakdown}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Sales */}
            <WeeklySalesChart
              data={executiveReportsData?.data?.ui?.weekly_sales}
            />

            {/* Operations Table */}
            <OperationsTable data={executiveReportsData?.data?.ui?.table} />
          </div>
        </>
      </div>
    </div>
  );
}
