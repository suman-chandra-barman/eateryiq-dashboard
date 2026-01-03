"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (!user) {
    return router.push("/login");
  }
  return router.push(`/dashboard/${user?.role}`);
}

export default DashboardPage;
