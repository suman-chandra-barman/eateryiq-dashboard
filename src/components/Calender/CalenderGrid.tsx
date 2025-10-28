"use client";

import { useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: "event" | "schedule";
  color?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDeleteEvent: (eventId: string) => void;
}

export function CalendarGrid({
  currentDate,
  events,
  onDeleteEvent,
}: CalendarGridProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendarArray = [];
    const currentDay = new Date(startDate);

    while (calendarArray.length < 42) {
      calendarArray.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return calendarArray;
  }, [currentDate]);

  const weeks = useMemo(() => {
    const weeksArray = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeksArray.push(calendarDays.slice(i, i + 7));
    }
    return weeksArray;
  }, [calendarDays]);

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate >= eventStart && checkDate <= eventEnd;
    });
  };

  const getEventSpanInfo = (event: Event, date: Date) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    eventStart.setHours(0, 0, 0, 0);
    eventEnd.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const isStart = checkDate.getTime() === eventStart.getTime();
    const isEnd = checkDate.getTime() === eventEnd.getTime();
    const isSpanning = checkDate > eventStart && checkDate < eventEnd;

    return { isStart, isEnd, isSpanning };
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {days.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-semibold text-gray-700 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="divide-y divide-gray-200">
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 divide-x divide-gray-200"
          >
            {week.map((date, dayIndex) => {
              const dayEvents = getEventsForDate(date);
              const isTodayDate = isToday(date);
              const isCurrentMonthDate = isCurrentMonth(date);

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`min-h-32 p-2 ${
                    isTodayDate ? "bg-blue-50" : "bg-white"
                  } ${!isCurrentMonthDate ? "bg-gray-50" : ""}`}
                >
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => {
                      const spanInfo = getEventSpanInfo(event, date);
                      const eventStart = new Date(event.startDate);
                      const eventEnd = new Date(event.endDate);
                      const startDateNum = eventStart.getDate();
                      const endDateNum = eventEnd.getDate();

                      const displayTitle =
                        startDateNum === endDateNum
                          ? event.title
                          : spanInfo.isStart
                          ? `${startDateNum} to ${endDateNum}`
                          : spanInfo.isEnd
                          ? `${startDateNum} to ${endDateNum}`
                          : `${startDateNum} to ${endDateNum}`;

                      return (
                        <div
                          key={event.id}
                          className="group relative text-xs bg-blue-500 text-white px-2 py-1 rounded truncate hover:bg-blue-600 cursor-pointer flex items-center justify-between"
                          title={event.title}
                        >
                          <span className="flex-1 truncate">
                            {displayTitle}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 h-4 w-4 p-0 ml-1 hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteEvent(event.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
