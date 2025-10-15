"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", year2020: 100, year2021: 45 },
  { month: "Feb", year2020: 20, year2021: 40 },
  { month: "Mar", year2020: 60, year2021: 50 },
  { month: "Apr", year2020: 75, year2021: 80 },
  { month: "May", year2020: 90, year2021: 85 },
  { month: "Jun", year2020: 50, year2021: 95 },
  { month: "Jul", year2020: 40, year2021: 30 },
  { month: "Aug", year2020: 65, year2021: 50 },
  { month: "Sep", year2020: 110, year2021: 70 },
  { month: "Oct", year2020: 105, year2021: 90 },
  { month: "Nov", year2020: 85, year2021: 110 },
  { month: "Dec", year2020: 75, year2021: 95 },
]

const chartConfig = {
  year2020: {
    label: "Previous Year",
    color: "hsl(250, 100%, 75%)",
  },
  year2021: {
    label: "This Year",
    color: "hsl(0, 100%, 85%)",
  },
}

export function DeliveryChart() {
  return (
    <Card className="p-6 bg-[#F2F7FF] rounded-2xl border-0 shadow-none">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Delivery Performance</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(250,100%,75%)]" />
            <span className="text-sm text-muted-foreground">Previous Year</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,100%,85%)]" />
            <span className="text-sm text-muted-foreground">This Year</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] bg-white rounded-2xl p-4 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillYear2020" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(250, 100%, 75%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(250, 100%, 75%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillYear2021" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 100%, 85%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 100%, 85%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="year2020"
              stroke="hsl(250, 100%, 75%)"
              strokeWidth={2}
              fill="url(#fillYear2020)"
            />
            <Area
              type="monotone"
              dataKey="year2021"
              stroke="hsl(0, 100%, 85%)"
              strokeWidth={2}
              fill="url(#fillYear2021)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  )
}
