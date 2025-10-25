import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="bg-card px-4 py-4 rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium text-[#3B3B3B] mb-4">{title}</h2>
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
            <div className="flex flex-col tex-[#3B3B3B]">
              <span className="font-medium text-xl">
                Jhon Marcel
              </span>
              <span className="text-xs text-muted-foreground">Operator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
