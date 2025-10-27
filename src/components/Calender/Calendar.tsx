// components/Calendar.tsx
'use client';

import { useMemo, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Event as RBCEvent } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { Button } from '@/components/ui/button';
import CreateEventModal from './CreateEventModal';
import { useEventStore, Event } from '@/store/useEventStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function Calendar() {
  const { events, deleteEvent } = useEventStore();
  const [modalOpen, setModalOpen] = useState(false);

  const rbcEvents: RBCEvent[] = events.map((e) => ({
    ...e,
    title: e.title,
    start: e.start,
    end: e.end,
    resource: e,
  }));

  const handleSelectEvent = (event: RBCEvent) => {
    if (confirm(`Delete event: "${event.title}"?`)) {
      deleteEvent((event.resource as Event).id);
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#2563eb',
      borderRadius: '4px',
      color: 'white',
      border: '0px',
      display: 'block',
      padding: '2px 4px',
      fontSize: '0.75rem',
    },
  });

  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">Today</Button>
            <Button onClick={() => setModalOpen(true)}>Create Event</Button>
          </div>
        </div>

        <div className="p-4" style={{ height: '700px' }}>
          <BigCalendar
            localizer={localizer}
            events={rbcEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month']}
            defaultView="month"
            defaultDate={new Date(2025, 1, 1)}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            dayPropGetter={(date) => {
              const hasEvent = events.some(
                (e) =>
                  format(e.start, 'yyyy-MM-dd') <= format(date, 'yyyy-MM-dd') &&
                  format(e.end, 'yyyy-MM-dd') >= format(date, 'yyyy-MM-dd')
              );
              return {
                className: hasEvent ? 'bg-blue-50' : '',
              };
            }}
          />
        </div>
      </div>

      <CreateEventModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}