"use client";

import { Eye, Trash2 } from "lucide-react";
import Pagination from "../Pagination";
import PageLoader from "@/components/Shared/PageLoader";

interface User {
  id: string;
  user_name: string;
  tr_id: string;
  email: string;
  user_role: string;
  address: string;
  join_date: string;
}

interface UsersTableProps {
  users: User[];
  onViewDetails: (user: User) => void;
  onDelete: (user: User) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function UsersTable({
  users,
  onViewDetails,
  onDelete,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading,
}: UsersTableProps) {

  if (isLoading) return <PageLoader/>;
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                #TR.ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Join Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <p className="text-gray-500">No users found</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.tr_id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {user.user_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.user_role}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.join_date}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onViewDetails(user)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                        aria-label="View details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        aria-label="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
