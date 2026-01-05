import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
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

export function StatsCard({
  title,
  value,
  compare,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="p-5 bg-blue-50 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4 items-center mb-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">
          {value.formatted}
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500 font-medium">{compare.label}</p>
          <p
            className={`text-xs px-2 py-1 rounded-2xl ${
              compare.direction === "up" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {compare.display}
          </p>
        </div>
      </div>
    </Card>
  );
}
