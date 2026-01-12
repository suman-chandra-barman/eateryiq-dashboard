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

interface SalesVsExpensesChartProps {
  chartData: {
    title: string;
    labels: string[];
    sales_label: string;
    expenses_label: string;
    sales: number[];
    expenses: number[];
    unit?: string;
    min?: number;
    max?: number;
    year?: number;
  };
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(142, 71%, 45%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(0, 84%, 60%)",
  },
};

export function SalesVsExpensesChart({ chartData }: SalesVsExpensesChartProps) {
  const data = chartData.labels.map((label, index) => ({
    month: label,
    sales: chartData.sales[index],
    expenses: chartData.expenses[index],
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
            <div className="w-3 h-3 rounded-full bg-[hsl(142,71%,45%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.sales_label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,84%,60%)]" />
            <span className="text-sm text-muted-foreground">
              {chartData.expenses_label}
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
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(142, 71%, 45%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(142, 71%, 45%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(0, 84%, 60%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(0, 84%, 60%)"
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
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              fill="url(#fillSales)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(0, 84%, 60%)"
              strokeWidth={2}
              fill="url(#fillExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
