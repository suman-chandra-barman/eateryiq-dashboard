"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterDocumentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: { type: string; format: string }
  onApplyFilters: (filters: { type: string; format: string }) => void
}

export function FilterDocumentsDialog({ open, onOpenChange, filters, onApplyFilters }: FilterDocumentsDialogProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApply = () => {
    onApplyFilters(localFilters)
    onOpenChange(false)
  }

  const handleReset = () => {
    const resetFilters = { type: "All", format: "All" }
    setLocalFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Documents</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Document Type</Label>
            <Select
              value={localFilters.type}
              onValueChange={(value) => setLocalFilters({ ...localFilters, type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="HR/Staff">HR/Staff</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>File Format</Label>
            <Select
              value={localFilters.format}
              onValueChange={(value) => setLocalFilters({ ...localFilters, format: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
                <SelectItem value="Word">Word</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
