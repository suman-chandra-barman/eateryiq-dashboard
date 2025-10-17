"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 100 },
  { day: "Wed", sales: 130 },
  { day: "Thu", sales: 90 },
  { day: "Fri", sales: 110 },
  { day: "Sat", sales: 105 },
  { day: "Sun", sales: 100 },
]

export function WeeklySalesChart() {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-gray-900">Weekly Sales</h3>
        <button className="text-gray-400 hover:text-gray-600 text-lg">⋮</button>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} />
          <YAxis stroke="#9ca3af" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#f3f4f6", fontSize: "12px" }}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Bar dataKey="sales" fill="#d1d5db" radius={[6, 6, 0, 0]} shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function CustomBar(props: any) {
  const { fill, x, y, width, height, payload } = props
  const isHighlighted = payload.day === "Wed"

  return <rect x={x} y={y} width={width} height={height} fill={isHighlighted ? "#3B82F6" : fill} rx={6} ry={6} />
}
