"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Document } from "@/app/dashboard/operator/documents/page"

interface AddDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (document: Omit<Document, "id">) => void
}

export function AddDocumentDialog({ open, onOpenChange, onAdd }: AddDocumentDialogProps) {
  const [fileName, setFileName] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [fileFormat, setFileFormat] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      if (!fileName) {
        setFileName(file.name)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!fileName) {
        setFileName(file.name)
      }
    }
  }

  const handleSubmit = () => {
    if (!fileName || !documentType || !fileFormat) {
      alert("Please fill in all fields")
      return
    }

    onAdd({
      fileName,
      type: documentType,
      fileFormat,
      uploadDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "0 MB",
    })

    // Reset form
    setFileName("")
    setDocumentType("")
    setFileFormat("")
    setSelectedFile(null)
  }

  const handleCancel = () => {
    setFileName("")
    setDocumentType("")
    setFileFormat("")
    setSelectedFile(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" min-w-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Add Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Document Upload Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-gray-50 w-full"
              />
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="HR/Staff">HR/Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select value={fileFormat} onValueChange={setFileFormat}>
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="Select file format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="Word">Word</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-blue-300 bg-white"
              }`}
            >
              <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Drop your documents here, or <span className="text-blue-600 underline">click to browse</span>
                  </p>
                  {selectedFile && <p className="text-sm text-green-600 font-medium">Selected: {selectedFile.name}</p>}
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={handleCancel} className="px-8 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="px-8 bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
