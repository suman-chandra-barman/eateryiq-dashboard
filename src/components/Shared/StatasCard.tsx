import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import chartsImage from "@/assets/charts.svg"

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: StatsCardProps) {

  return (
    <Card className="bg-[#F2F7FF] rounded-2xl border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {change}
            </p>
          </div>

          <div className="flex items-end gap-0.5 h-12">
            <Image
              src={chartsImage}
              alt="Sales Chart Icon"
              width={60}
              height={30}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
