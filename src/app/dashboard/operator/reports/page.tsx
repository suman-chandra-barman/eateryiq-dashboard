"use client"

import { DailyOperationsChart } from "@/components/Reports/DailyOperationsChart"
import { OperationsTable } from "@/components/Reports/OperationsTable"
import { StatsCard } from "@/components/Reports/StatsCard"
import { WeeklySalesChart } from "@/components/Reports/WeeklySalesCart"
import { TrendingUp, CheckCircle, Truck, Users } from "lucide-react";

export default function ReportsPage() {

const statsData = [
  {
    title: "Today Sales",
    value: "$135,20.0",
    change: "+150",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Order Completed",
    value: "$135,20.0",
    change: "+150",
    trend: "up",
    icon: CheckCircle,
  },
  {
    title: "Delivery On-Time Rate",
    value: "58%",
    change: "+20%",
    trend: "up",
    icon: Truck,
  },
  {
    title: "Shift Attendance",
    value: "30%",
    change: "-2%",
    trend: "down",
    icon: Users,
  },
];


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 bg-white rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards - 2x2 Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Daily Operations Breakdown Chart */}
          <div className="lg:col-span-1">
            <DailyOperationsChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Sales */}
          <WeeklySalesChart />

          {/* Operations Table */}
          <OperationsTable />
        </div>
      </div>
    </div>
  )
}
