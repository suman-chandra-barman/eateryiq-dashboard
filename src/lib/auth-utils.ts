import { TUser, UserRole } from "@/types/auth";

/**
 * Get the appropriate dashboard path based on user role and admin status
 * @param role - User role (operations, marketing_manager, executive)
 * @param isAdmin - Whether the user is an admin
 * @returns The path to redirect the user to
 */
export function getRoleBasedPath(role: UserRole, isAdmin?: boolean): string {
  // If user is admin, redirect to admin dashboard
  if (isAdmin) {
    return "/admin";
  }

  // Redirect based on user role
  switch (role) {
    case "executive":
      return "/dashboard/executive";
    case "marketing_manager":
      return "/dashboard/marketing_manager";
    case "operations":
      return "/dashboard/operations";
    default:
      return "/admin";
  }
}

/**
 * Get the role-based path from user object
 * @param user - User object
 * @returns The path to redirect the user to
 */
export function getUserDashboardPath(user: TUser | null): string {
  if (!user) {
    return "/login";
  }

  return getRoleBasedPath(user.role, user.is_admin);
}
