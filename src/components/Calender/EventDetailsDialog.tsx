"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

interface EventDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event | null;
  onDelete: (eventId: string) => void;
  isDeleting?: boolean;
}

export function EventDetailsDialog({
  open,
  onOpenChange,
  event,
  onDelete,
  isDeleting = false,
}: EventDetailsDialogProps) {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-gray-600 text-sm">Title</Label>
            <p className="mt-1 text-gray-900 font-medium">{event.title}</p>
          </div>

          {event.description && (
            <div>
              <Label className="text-gray-600 text-sm">Description</Label>
              <p className="mt-1 text-gray-900">{event.description}</p>
            </div>
          )}

          <div>
            <Label className="text-gray-600 text-sm">Start Date</Label>
            <p className="mt-1 text-gray-900">{formatDate(event.startDate)}</p>
          </div>

          <div>
            <Label className="text-gray-600 text-sm">End Date</Label>
            <p className="mt-1 text-gray-900">{formatDate(event.endDate)}</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
