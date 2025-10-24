"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarGrid } from "@/components/Calender/CalenderGrid";
import { CreateEventDialog } from "@/components/Calender/CreateEventDialog";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<
    Array<{
      id: string;
      title: string;
      startDate: Date;
      endDate: Date;
      type: "event" | "schedule";
      color?: string;
    }>
  >([]);
  const [showEventDialog, setShowEventDialog] = useState(false);

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

  const handleAddEvent = (eventData: any) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      type: "event",
    };
    setEvents([...events, newEvent]);
    setShowEventDialog(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold text-foreground mb-8">Calender</h1>

      <div className="flex-1">
        <Card className="p-6 bg-card border-0 shadow-none border-gray-200">
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

          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onDeleteEvent={handleDeleteEvent}
          />
        </Card>
      </div>

      <CreateEventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
