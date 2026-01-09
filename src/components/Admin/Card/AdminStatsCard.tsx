"use client";

import { Card } from "@/components/ui/card";
import { useGetAdminDashboardStatsQuery } from "@/redux/features/stats/statsApi";

export default function AdminStatsCards() {
  const { data, isLoading, error } = useGetAdminDashboardStatsQuery({});

  const stats = [
    {
      label: "Total Earnings",
      value: data?.data?.total_earnings ? `$${data.data.total_earnings}` : "$0",
    },
    {
      label: "Total Users",
      value: data?.data?.total_users?.toString() || "0",
    },
    {
      label: "Total subscriber",
      value: data?.data?.total_subscribers?.toString() || "0",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border p-6 border-blue-500 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border p-6 border-red-500 col-span-3">
          <p className="text-red-600 text-sm">Error loading stats</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border p-6 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
          <p className={`text-3xl font-bold `}>{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
