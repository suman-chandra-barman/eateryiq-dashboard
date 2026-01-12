"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SalesVsTargetChartProps {
  chartData: {
    title: string;
    labels: string[];
    sales_label: string;
    target_label: string;
    sales: number[];
    target: number[];
    unit?: string;
    min?: number;
    max?: number;
    year?: number;
  };
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(217, 91%, 60%)",
  },
  target: {
    label: "Target",
    color: "hsl(271, 91%, 65%)",
  },
};

export function SalesVsTargetChart({ chartData }: SalesVsTargetChartProps) {
  const data = chartData.labels.map((label, index) => ({
    month: label,
    sales: chartData.sales[index],
    target: chartData.target[index],
  }));

  return (
    <Card className="p-6 bg-[#F2F7FF] rounded-2xl border-0 shadow-none">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {chartData.title}
          {chartData.year && (
            <span className="text-sm text-muted-foreground ml-2">
              ({chartData.year})
            </span>
          )}
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(217,91%,60%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.sales_label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(271,91%,65%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.target_label}
            </span>
          </div>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className="h-[400px] bg-white rounded-2xl p-4 pl-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillSalesTarget" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(217, 91%, 60%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(217, 91%, 60%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(271, 91%, 65%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(271, 91%, 65%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#fillSalesTarget)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="hsl(271, 91%, 65%)"
              strokeWidth={2}
              fill="url(#fillTarget)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
