"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="bg-card px-4 py-4 rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium text-[#3B3B3B]">{title}</h2>
        <div className="flex items-center gap-4">
          
          {/* <Button
            variant="ghost"
            size="icon"
            className="relative hover:text-blue-600 hover:bg-[#F2F7FF]"
          >
            <Bell className="w-5 h-5" />
          </Button> */}

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user?.profile_image_url}
                alt={user?.full_name}
              />
              <AvatarFallback className="font-bold uppercase">{user?.full_name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col tex-[#3B3B3B]">
              <span className="font-medium text-xl">{user?.full_name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.role === "operations"
                  ? "Operator"
                  : user?.role === "executive"
                  ? "Executive"
                  : "Marketing Manager"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
