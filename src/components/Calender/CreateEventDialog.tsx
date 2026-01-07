"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCreateCalendarEventMutation } from "@/redux/features/calendar/calendarApi";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventDialog({
  open,
  onOpenChange,
}: CreateEventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const today = new Date();

  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();

  const daysInMonth = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDay = new Date(startDate);
    while (days.length < 42) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  }, [calendarMonth]);

  const handleDateClick = (date: Date) => {
    const dateStr = date.toDateString();
    const isSelected = selectedDates.some((d) => d.toDateString() === dateStr);

    if (isSelected) {
      setSelectedDates(
        selectedDates.filter((d) => d.toDateString() !== dateStr)
      );
    } else {
      setSelectedDates(
        [...selectedDates, date].sort((a, b) => a.getTime() - b.getTime())
      );
    }
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some((d) => d.toDateString() === date.toDateString());
  };

  const isDateInRange = (date: Date) => {
    if (selectedDates.length < 2) return false;
    const minDate = selectedDates[0];
    const maxDate = selectedDates[selectedDates.length - 1];
    return date >= minDate && date <= maxDate;
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && selectedDates.length > 0) {
      const sortedDates = [...selectedDates].sort(
        (a, b) => a.getTime() - b.getTime()
      );
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];

      try {
        await createEvent({
          title,
          description: description || "Envatos Community with Kleon Team",
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }).unwrap();

        toast.success("Event created successfully!");
        setTitle("");
        setDescription("");
        setSelectedDates([]);
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to create event:", error);
        toast.error("Failed to create event. Please try again.");
      }
    }
  };

  const monthName = calendarMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-4">
              Event Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Event title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-4">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Event description (optional)"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label className="mb-4">Select Dates</Label>
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{monthName}</h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() - 1
                        )
                      )
                    }
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() + 1
                        )
                      )
                    }
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-600 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {daysInMonth.map((date, idx) => {
                  const isSelected = isDateSelected(date);
                  const isInRange = isDateInRange(date);
                  const isCurrentMonth =
                    date.getMonth() === calendarMonth.getMonth();
                  const isTodayDate = isToday(date);

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDateClick(date)}
                      className={`p-2 text-sm rounded text-center ${
                        isSelected
                          ? "bg-blue-600 text-white font-semibold"
                          : isInRange
                          ? "bg-blue-100 text-gray-900"
                          : isTodayDate
                          ? "bg-blue-200 text-gray-900 font-semibold"
                          : isCurrentMonth
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-gray-400"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
