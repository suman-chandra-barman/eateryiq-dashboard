/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import UserDetailsModal from "@/components/Admin/Modal/UserDetailsModal";
import OperatorTable from "@/components/Admin/Table/OperatorTable";
import PageLoader from "@/components/Shared/PageLoader";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useGetAllOperationUsersQuery,
  useDeleteOperationUserMutation,
} from "@/redux/features/users/userApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  plan: string;
  joinDate: string;
}

export default function OperationsPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useGetAllOperationUsersQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  const [deleteOperationUser, { isLoading: isDeleting }] =
    useDeleteOperationUserMutation();

  const users: User[] =
    data?.data?.map((user: any) => ({
      id: user.id.toString(),
      name: user.user_name,
      email: user.email,
      role: "Operator",
      plan: user.plan,
      address: "UK",
      joinDate: "1 Jan, 2025",
    })) || [];

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteOperationUser(Number(selectedUser.id)).unwrap();
        setDeleteModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Operations List
        </h2>
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {isLoading ? (
        <PageLoader className="h-[70vh]"/>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-red-500">Error loading operations users</div>
        </div>
      ) : (
        <OperatorTable
          users={users}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteClick}
          currentPage={currentPage}
          totalPages={data?.meta?.totalPage || 1}
          totalItems={data?.meta?.total || 0}
          onPageChange={setCurrentPage}
        />
      )}

      {selectedUser && (
        <>
          <UserDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            userId={Number(selectedUser.id)}
            isOperator={true}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title={"user"}
            isLoading={isDeleting}
          />
        </>
      )}
    </div>
  );
}
