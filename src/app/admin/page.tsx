"use client";

import AdminStatsCards from "@/components/Admin/Card/AdminStatsCard";
import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import UserDetailsModal from "@/components/Admin/Modal/UserDetailsModal";
import UsersTable from "@/components/Admin/Table/UsersTable";
import {
  useGetAllRecentUsersQuery,
  useDeleteUserMutation,
} from "@/redux/features/users/userApi";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const limit = 10;
  const {
    data: usersData,
    isLoading,
    error,
  } = useGetAllRecentUsersQuery({ page: currentPage, limit });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = usersData?.data || [];
  const totalPages = usersData?.meta?.totalPage || 1;
  const totalItems = usersData?.meta?.total || 0;

  const handleViewDetails = (userId: number) => {
    setSelectedUserId(userId);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId).unwrap();
        toast.success("User deleted successfully");
        setDeleteModalOpen(false);
        setSelectedUserId(null);
      } catch (error) {
        const errorMessage =
          error &&
          typeof error === "object" &&
          "data" in error &&
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data
            ? String(error.data.message)
            : "Failed to delete user";
        toast.error(errorMessage);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <AdminStatsCards />
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Recent Users
          </h2>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm">Error loading users data</p>
          </div>
        )}
        <UsersTable
          users={users}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteClick}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>

      {selectedUserId && (
        <>
          <UserDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => {
              setDetailsModalOpen(false);
              setSelectedUserId(null);
            }}
            userId={selectedUserId}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedUserId(null);
            }}
            onConfirm={handleConfirmDelete}
            title={"user"}
            isLoading={isDeleting}
          />
        </>
      )}
    </div>
  );
}
