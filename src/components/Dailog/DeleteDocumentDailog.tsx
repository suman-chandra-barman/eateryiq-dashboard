"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteDocumentDialog({ open, onOpenChange, onConfirm }: DeleteDocumentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Document file</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 w-full justify-center">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="px-8">
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm} className="px-8 bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
