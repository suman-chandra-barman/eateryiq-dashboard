"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";

export default function AdminDashboardHeader() {
  const {} = useAppSelector((state) => state.auth);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  return (
    <div className="bg-card p-4 rounded-2xl mb-6 border border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Welcome, {currentUser?.full_name || "User"}
          </h2>
          <p>Have a nice day</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser?.profile_image_url}
                alt={currentUser?.full_name}
              />
              <AvatarFallback>{currentUser?.full_name ? currentUser.full_name.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <div className="font-medium text-xl text-foreground">
              {currentUser?.full_name }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
