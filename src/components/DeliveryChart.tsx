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

interface DeliveryChartProps {
  chartData: {
    title: string;
    labels: string[];
    previous_year_label: string;
    this_year_label: string;
    previous_year: number[];
    this_year: number[];
    unit?: string;
    min?: number;
    max?: number;
  };
}

const chartConfig = {
  previousYear: {
    label: "Previous Year",
    color: "hsl(250, 100%, 75%)",
  },
  thisYear: {
    label: "This Year",
    color: "hsl(0, 100%, 85%)",
  },
};

export function DeliveryChart({ chartData }: DeliveryChartProps) {
  const data = chartData.labels.map((label, index) => ({
    month: label,
    previousYear: chartData.previous_year[index],
    thisYear: chartData.this_year[index],
  }));

  return (
    <Card className="p-6 bg-[#F2F7FF] rounded-2xl border-0 shadow-none">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {chartData.title}
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(250,100%,75%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.previous_year_label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,100%,85%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.this_year_label}
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
              <linearGradient id="fillYear2020" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(250, 100%, 75%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(250, 100%, 75%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillYear2021" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(0, 100%, 85%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(0, 100%, 85%)"
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
              dataKey="previousYear"
              stroke="hsl(250, 100%, 75%)"
              strokeWidth={2}
              fill="url(#fillYear2020)"
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="hsl(0, 100%, 85%)"
              strokeWidth={2}
              fill="url(#fillYear2021)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
