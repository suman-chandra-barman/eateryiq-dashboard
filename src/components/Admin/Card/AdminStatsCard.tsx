import { Card } from "@/components/ui/card";

export default function AdminStatsCards() {
  const stats = [
    {
      label: "Total Earnings",
      value: "$2005.23",
    },
    {
      label: "Total Users",
      value: "235",
    },
    {
      label: "Total subscriber",
      value: "195",
    },
  ];

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
