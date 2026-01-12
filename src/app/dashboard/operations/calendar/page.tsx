"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarGrid } from "@/components/Calender/CalenderGrid";
import { CreateEventDialog } from "@/components/Calender/CreateEventDialog";
import { EventDetailsDialog } from "@/components/Calender/EventDetailsDialog";
import {
  useGetCalendarEventsQuery,
  useDeleteCalendarEventMutation,
  useCreateCalendarEventMutation,
} from "@/redux/features/calendar/calendarApi";
import { toast } from "sonner";
import PageLoader from "@/components/Skeletons/PageLoader";

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: "event" | "schedule";
  color?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const { data: eventsData, isLoading, error } = useGetCalendarEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] =
    useDeleteCalendarEventMutation();

  const events = useMemo(() => {
    if (!eventsData?.data) return [];

    return eventsData.data.map((event) => ({
      id: event.id.toString(),
      title: event.title,
      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
      type: "event" as const,
      color: "blue",
      description: event.description,
    }));
  }, [eventsData]);

  // Show error toast if fetch fails
  if (error) {
    toast.error("Failed to load calendar events");
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(Number(eventId)).unwrap();
      toast.success("Event deleted successfully!");
      setShowDetailsDialog(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailsDialog(true);
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-medium text-[#3B3B3B] mb-4">Calendar</h1>
      <div className="flex-1 bg-white">
        <Card className="p-6 bg-card border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {monthName}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevMonth}
                className="border-gray-300 bg-transparent hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextMonth}
                className="border-gray-300 bg-transparent hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleToday}
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Today
              </Button>
              <Button
                onClick={() => setShowEventDialog(true)}
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {isLoading ? (
            <PageLoader className="h-[65vh]" />
          ) : (
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
            />
          )}
        </Card>
      </div>

      <CreateEventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        createCalendarEventMutation={useCreateCalendarEventMutation()}
      />

      <EventDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        isDeleting={isDeleting}
      />
    </div>
  );
}
