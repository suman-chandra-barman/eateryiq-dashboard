import DashboardHeader from "@/components/DashboardHeader";
import { DeliveryChart } from "@/components/DeliveryChart";
import StatsCard from "@/components/StatasCard";
import { TrendingUp, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Operator Dashboard" />

      <div className="p-4 bg-white my-4 rounded-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Today Sales"
            value="$135,20,0"
            change="+11.01%"
            trend="up"
            icon={TrendingUp}
            chartData={[45, 52, 48, 55, 60, 58, 65, 70, 68, 72, 75, 70]}
          />
          <StatsCard
            title="Staff Attendance"
            value="58%"
            change="-0.03%"
            trend="down"
            icon={Users}
            chartData={[60, 58, 62, 59, 61, 58, 60, 62, 59, 58, 60, 58]}
          />
          <StatsCard
            title="Labor Cost vs Budget"
            value="$135,20,0"
            change="+11.01%"
            trend="up"
            icon={DollarSign}
            chartData={[50, 55, 52, 58, 62, 60, 65, 68, 70, 72, 75, 73]}
          />
        </div>

        <DeliveryChart />
      </div>
    </div>
  );
}
