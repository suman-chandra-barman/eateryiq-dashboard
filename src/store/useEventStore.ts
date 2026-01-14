import { create } from "zustand";

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        { ...event, id: Math.random().toString(36).substring(7) },
      ],
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...updatedEvent } : e
      ),
    })),
}));
