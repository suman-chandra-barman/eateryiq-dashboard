import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

export function StatsCard({ title, value, change, icon:Icon }: StatsCardProps) {
  return (
    <Card className="p-5 bg-blue-50 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4 items-center mb-3">
         <Icon />
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">Compare with last month</p>
          <p
            className={`text-xs px-2 py-1 rounded-2xl ${
              Number(change) > 0 ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {change}
          </p>
        </div>
      </div>
    </Card>
  );
}
