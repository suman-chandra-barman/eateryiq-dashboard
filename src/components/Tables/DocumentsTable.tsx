"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Document } from "@/app/dashboard/operations/documents/page";
import { DeleteDocumentDialog } from "../Dailog/DeleteDocumentDailog";

interface DocumentsTableProps {
  documents: Document[];
  onDeleteDocuments: (ids: string[]) => void;
}

export function DocumentsTable({
  documents,
  onDeleteDocuments,
}: DocumentsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(documents.map((doc) => doc.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDownload = (doc: Document) => {
    if (!doc.fileUrl) {
      toast.error("File URL not available");
      return;
    }

    try {
      // Get base URL from environment or use default
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const fullUrl = doc.fileUrl.startsWith("http")
        ? doc.fileUrl
        : `${baseUrl}${doc.fileUrl}`;

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = fullUrl;
      link.download = doc.fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${doc.fileName}`);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      onDeleteDocuments([documentToDelete]);
      setDocumentToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      onDeleteDocuments(selectedIds);
      setSelectedIds([]);
    }
  };

  const getFileIcon = (format: string) => {
    const icons: Record<string, string> = {
      Excel: "📊",
      Word: "📄",
      PDF: "📕",
    };
    return icons[format] || "📄";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {selectedIds.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
          <span className="text-sm text-blue-900">
            {selectedIds.length} document{selectedIds.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedIds.length === documents.length &&
                  documents.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              File Name
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Type</TableHead>
            <TableHead className="font-semibold text-gray-700">
              File Format
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Upload date
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              File size
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.id}
              className={selectedIds.includes(doc.id) ? "bg-blue-50" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(doc.id)}
                  onCheckedChange={(checked) =>
                    handleSelectOne(doc.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {doc.fileName}
              </TableCell>
              <TableCell className="text-gray-600">{doc.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{getFileIcon(doc.fileFormat)}</span>
                  <span>{doc.fileFormat}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{doc.uploadDate}</TableCell>
              <TableCell className="text-gray-600">{doc.fileSize}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(doc)}
                    className="hover:bg-gray-100"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(doc.id)}
                    className="hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteDocumentDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
