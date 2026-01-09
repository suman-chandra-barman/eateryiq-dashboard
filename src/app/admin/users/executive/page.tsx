/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import ExecutiveUserDetailsModal from "@/components/Admin/Modal/ExecutiveUserDetailsModal";
import OperatorTable from "@/components/Admin/Table/OperatorTable";
import PageLoader from "@/components/Shared/PageLoader";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useGetAllExecutiveUsersQuery,
  useDeleteExecutiveUserMutation,
} from "@/redux/features/users/userApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  joinDate: string;
}

export default function ExecutivePage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useGetAllExecutiveUsersQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  const [deleteExecutiveUser, { isLoading: isDeleting }] =
    useDeleteExecutiveUserMutation();

  const users: User[] =
    data?.data?.map((user: any) => ({
      id: user.id.toString(),
      name: user.user_name,
      email: user.email,
      role: "Executive",
      plan: user.plan,
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
        await deleteExecutiveUser(Number(selectedUser.id)).unwrap();
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
          Executive List
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
        <PageLoader className="h-[70vh]" />
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-red-500">Error loading executive users</div>
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
          <ExecutiveUserDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            userId={Number(selectedUser.id)}
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
