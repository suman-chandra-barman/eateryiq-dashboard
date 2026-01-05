"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ShoppingCart, Truck, CheckSquare, AlertCircle } from "lucide-react";

interface BreakdownItem {
  label: string;
  source: string;
  amount: number;
  percent: number;
}

interface DailyOperationsChartProps {
  data?: {
    title: string;
    total: number;
    items: BreakdownItem[];
  };
}

const COLORS = ["#FCD34D", "#EF4444", "#1F2937", "#3B82F6"];
const TEXT_COLORS = ["#F59E0B", "#3B82F6", "#1F2937", "#EF4444"];

const getIcon = (label: string) => {
  if (label.includes("In Store")) return ShoppingCart;
  if (label.includes("Online")) return Truck;
  if (label.includes("3PD")) return CheckSquare;
  return AlertCircle;
};

const renderCustomLabel = (total: number) => {
  return (
    <g>
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs fill-gray-500"
      >
        Total
      </text>
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-bold fill-gray-900"
      >
        {total}%
      </text>
    </g>
  );
};

export function DailyOperationsChart({ data }: DailyOperationsChartProps) {
  const chartData =
    data?.items.map((item) => ({
      name: item.label,
      value: Math.abs(item.percent),
      amount: item.amount,
    })) || [];

  const title = data?.title || "Daily Operations Breakdown";
  const total = data?.total || 100;

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="flex justify-center mb-6">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={renderCustomLabel(total)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {chartData.map((item, index) => {
          const IconComponent = getIcon(item.name);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: TEXT_COLORS[index] }}
              >
                {item.value.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
