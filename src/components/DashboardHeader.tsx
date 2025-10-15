import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="border border-border bg-card px-8 py-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hover:text-blue-600 hover:bg-[#F2F7FF]">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Jhon Marcel"
              />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-xl text-foreground">
                Jhon Marcel
              </div>
              <div className="text-xs text-muted-foreground">Operator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
