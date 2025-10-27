// components/CreateEventModal.tsx
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEventStore } from '@/store/useEventStore';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const addEvent = useEventStore((s) => s.addEvent);

  const handleSubmit = () => {
    if (!title || !startDate || !endDate) return;
    addEvent(title, startDate, endDate);
    setTitle('');
    setStartDate(undefined);
    setEndDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Event Title</Label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <div className="border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md"
                />
              </div>
              {startDate && (
                <p className="text-sm text-muted-foreground mt-1">
                  {format(startDate, 'PPP')}
                </p>
              )}
            </div>

            <div>
              <Label>End Date</Label>
              <div className="border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md"
                />
              </div>
              {endDate && (
                <p className="text-sm text-muted-foreground mt-1">
                  {format(endDate, 'PPP')}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!title || !startDate || !endDate}>
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}