"use client";

import { useMemo } from "react";

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: "event" | "schedule";
  color?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function CalendarGrid({
  currentDate,
  events,
  onEventClick,
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

  const getEventPosition = (event: Event, week: Date[], weekIndex: number) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    eventStart.setHours(0, 0, 0, 0);
    eventEnd.setHours(0, 0, 0, 0);

    const weekStart = new Date(week[0]);
    const weekEnd = new Date(week[6]);
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);

    // Check if event intersects with this week
    if (eventEnd < weekStart || eventStart > weekEnd) {
      return null;
    }

    // Find start and end positions within the week
    let startCol = 0;
    let endCol = 6;

    for (let i = 0; i < week.length; i++) {
      const day = new Date(week[i]);
      day.setHours(0, 0, 0, 0);

      if (day.getTime() === eventStart.getTime()) {
        startCol = i;
      }
      if (day.getTime() === eventEnd.getTime()) {
        endCol = i;
        break;
      }
      if (day > eventEnd) {
        endCol = i - 1;
        break;
      }
    }

    // If event starts before this week
    if (eventStart < weekStart) {
      startCol = 0;
    }

    // If event ends after this week
    if (eventEnd > weekEnd) {
      endCol = 6;
    }

    const span = endCol - startCol + 1;

    return {
      startCol,
      span,
      shouldShow:
        startCol === 0 || week[startCol].getTime() === eventStart.getTime(),
    };
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
          <div key={weekIndex} className="relative">
            {/* Day cells */}
            <div className="grid grid-cols-7 divide-x divide-gray-200">
              {week.map((date, dayIndex) => {
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
                  </div>
                );
              })}
            </div>

            {/* Event bars */}
            <div className="absolute top-8 left-0 right-0 grid grid-cols-7 pointer-events-none px-2">
              {events.map((event) => {
                const position = getEventPosition(event, week, weekIndex);
                if (!position || !position.shouldShow) return null;

                const eventColor =
                  event.color === "blue"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-pink-500 hover:bg-pink-600";

                return (
                  <div
                    key={`${event.id}-${weekIndex}`}
                    className={`text-xs ${eventColor} text-white px-2 py-1 rounded cursor-pointer transition-colors pointer-events-auto mb-1`}
                    style={{
                      gridColumn: `${position.startCol + 1} / span ${
                        position.span
                      }`,
                    }}
                    onClick={() => onEventClick(event)}
                    title={event.title}
                  >
                    <span className="font-medium truncate block">
                      {event.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
