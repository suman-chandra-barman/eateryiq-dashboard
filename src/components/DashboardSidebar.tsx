"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronsRight, ChevronsLeft, ChevronRight } from "lucide-react";
import { LogoutDialog } from "@/components/Dailog/LogoutDialog";
import logo from "@/assets/logo.png";
import logoWithoutText from "@/assets/logo_without_text.png";
import user from "@/assets/user.jpg";
import { sidebarItems } from "@/config/sidebarItems";
import { LucideIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

type Role = "operations" | "marketingManager" | "executive";

export function DashboardSidebar({ role = "operations" }: { role?: Role }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const navItems: NavItem[] = sidebarItems[role] || sidebarItems["operations"];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setShowLogoutDialog(false);
    router.push("/login");
  };

  return (
    <>
      <div
        className={cn(
          "bg-white transition-all duration-300 ease-in-out flex flex-col rounded-2xl shadow-sm",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* ===== Logo & Collapse Button ===== */}
        <div
          className={cn(
            "p-4 flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-4 h-12">
                <Image src={logo} alt="Logo" className="w-28" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
              >
                <ChevronsLeft className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center justify-center"
              >
                <Image src={logoWithoutText} alt="Logo" className="w-8 h-8" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-[#F2F7FF]"
              >
                <ChevronsRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* ===== Nav Items ===== */}
        <nav
          className={cn(
            "py-4 flex flex-col flex-1 space-y-2",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-11 text-[#535F72] hover:bg-[#F2F7FF] hover:text-blue-600 rounded-[12px]",
                    isCollapsed ? "justify-center px-0" : "justify-start gap-3",
                    isActive &&
                      "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* ===== User Profile ===== */}
        <div className="bg-white p-4 text-[#3B3B3B] space-y-4 border-t">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className={cn(
              "w-full flex items-center bg-[#F2F7FF] transition-colors rounded-2xl cursor-pointer",
              isCollapsed ? "justify-center p-2" : "gap-3 p-4"
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.src} alt="User Avatar" />
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">
                    {currentUser?.full_name || "Jhon Marcel"}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {currentUser?.role?.replace("_", " ") || role}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===== Logout Dialog ===== */}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
}
