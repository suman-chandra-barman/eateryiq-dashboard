"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowLogoutDialog: (open: boolean) => void;
}

export function LogoutDialog({
  open,
  onOpenChange,
  setShowLogoutDialog
}: LogoutDialogProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setShowLogoutDialog(false);
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out from your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="!gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
