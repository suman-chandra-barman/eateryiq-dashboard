"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { DocumentsTable } from "@/components/DocumentsTable";
import { AddDocumentDialog } from "@/components/Dailog/AddDocumentDailog";
import { FilterDocumentsDialog } from "@/components/Dailog/FilterDocumentDailog";

export type Document = {
  id: string;
  fileName: string;
  type: string;
  fileFormat: string;
  uploadDate: string;
  fileSize: string;
  fileUrl?: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "Excel",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "2",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "Word",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "3",
      fileName: "PR Sales 6.19412",
      type: "Finance",
      fileFormat: "Excel",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "4",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "PDF",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "5",
      fileName: "PR Sales 6.19412",
      type: "Legal",
      fileFormat: "Excel",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "6",
      fileName: "PR Sales 6.19412",
      type: "Staff",
      fileFormat: "Word",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "7",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "Excel",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "8",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "Word",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "9",
      fileName: "PR Sales 6.19412",
      type: "Compliance",
      fileFormat: "Excel",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
    {
      id: "10",
      fileName: "PR Sales 6.19412",
      type: "Custom",
      fileFormat: "PDF",
      uploadDate: "20 Jan, 2025",
      fileSize: "5 MB",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [filters, setFilters] = useState({ type: "All", format: "All" });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.fileName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filters.type === "All" || doc.type === filters.type;
    const matchesFormat =
      filters.format === "All" || doc.fileFormat === filters.format;
    return matchesSearch && matchesType && matchesFormat;
  });

  const handleAddDocument = (newDoc: Omit<Document, "id">) => {
    const doc: Document = {
      ...newDoc,
      id: Date.now().toString(),
    };
    setDocuments([doc, ...documents]);
    setShowAddDialog(false);
  };

  const handleDeleteDocuments = (ids: string[]) => {
    setDocuments(documents.filter((doc) => !ids.includes(doc.id)));
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Documents
      </h1>
      <div className="flex-1 p-6 overflow-auto bg-white rounded-2xl border">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilterDialog(true)}
                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </Button>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </div>
          </div>

          {/* Documents Table */}
          <DocumentsTable
            documents={filteredDocuments}
            onDeleteDocuments={handleDeleteDocuments}
          />
        </div>
      </div>

      {/* Dialogs */}
      <AddDocumentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddDocument}
      />
      <FilterDocumentsDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
}
