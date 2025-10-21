"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import EarningDetailsModal from "@/components/Admin/Modal/EarningDetailsModal";
import EarningTable from "@/components/Admin/Table/EarningsTable";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface Earning {
  id: string;
  name: string;
  email: string;
  address: string;
  plan: string;
  date: string;
  price: number;
}

const earining: Earning[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "New York, USA",
    plan: "Basic",
    date: "2025-01-10",
    price: 19,
  },
  {
    id: "2",
    name: "Emma Watson",
    email: "emma.watson@example.com",
    address: "London, UK",
    plan: "Pro",
    date: "2025-02-14",
    price: 49,
  },
  {
    id: "3",
    name: "Liam Smith",
    email: "liam.smith@example.com",
    address: "Sydney, Australia",
    plan: "Premium",
    date: "2025-03-01",
    price: 79,
  },
  {
    id: "4",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    address: "Toronto, Canada",
    plan: "Basic",
    date: "2025-03-20",
    price: 19,
  },
  {
    id: "5",
    name: "Noah Johnson",
    email: "noah.johnson@example.com",
    address: "California, USA",
    plan: "Pro",
    date: "2025-04-05",
    price: 49,
  },
  {
    id: "6",
    name: "Olivia Miller",
    email: "olivia.miller@example.com",
    address: "Berlin, Germany",
    plan: "Premium",
    date: "2025-04-25",
    price: 79,
  },
  {
    id: "7",
    name: "Ethan Davis",
    email: "ethan.davis@example.com",
    address: "Paris, France",
    plan: "Basic",
    date: "2025-05-10",
    price: 19,
  },
  {
    id: "8",
    name: "Ava Wilson",
    email: "ava.wilson@example.com",
    address: "Rome, Italy",
    plan: "Pro",
    date: "2025-05-30",
    price: 49,
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james.anderson@example.com",
    address: "Madrid, Spain",
    plan: "Premium",
    date: "2025-06-12",
    price: 79,
  },
  {
    id: "10",
    name: "Isabella Martinez",
    email: "isabella.martinez@example.com",
    address: "Mexico City, Mexico",
    plan: "Basic",
    date: "2025-06-25",
    price: 19,
  },
  {
    id: "11",
    name: "William Thomas",
    email: "william.thomas@example.com",
    address: "Amsterdam, Netherlands",
    plan: "Pro",
    date: "2025-07-08",
    price: 49,
  },
  {
    id: "12",
    name: "Mia Garcia",
    email: "mia.garcia@example.com",
    address: "Lisbon, Portugal",
    plan: "Premium",
    date: "2025-07-21",
    price: 79,
  },
  {
    id: "13",
    name: "Benjamin Lee",
    email: "benjamin.lee@example.com",
    address: "Tokyo, Japan",
    plan: "Basic",
    date: "2025-08-03",
    price: 19,
  },
  {
    id: "14",
    name: "Charlotte White",
    email: "charlotte.white@example.com",
    address: "Seoul, South Korea",
    plan: "Pro",
    date: "2025-08-16",
    price: 49,
  },
  {
    id: "15",
    name: "Lucas Harris",
    email: "lucas.harris@example.com",
    address: "Dhaka, Bangladesh",
    plan: "Premium",
    date: "2025-09-01",
    price: 79,
  },
];
function EarningsPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Earning | null>(null);

  const handleViewDetails = (user: Earning) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (user: Earning) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Earning List</h2>
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <EarningTable
        earnings={earining}
        onViewDetails={handleViewDetails}
        onDelete={handleDeleteClick}
      />

      {selectedUser && (
        <>
          <EarningDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            earning={selectedUser}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title={"earning"}
          />
        </>
      )}
    </div>
  );
}

export default EarningsPage;
