import { baseApi } from "../../api/baseApi";

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_all_day?: boolean;
  dashboard_role: string;
  created_at: string;
  created_by: number;
}

export interface CreateCalendarEventRequest {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface CalendarEventsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: CalendarEvent[];
  requestId: string;
}

export interface CalendarEventResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: CalendarEvent;
  requestId: string;
}

export const calendarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarEvents: builder.query<CalendarEventsResponse, void>({
      query: () => ({
        url: "/api/dashboards/operations/calendar/",
        method: "GET",
      }),
      providesTags: ["Calendar"],
    }),
    createCalendarEvent: builder.mutation<
      CalendarEventResponse,
      CreateCalendarEventRequest
    >({
      query: (body) => ({
        url: "/api/dashboards/operations/calendar/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Calendar"],
    }),
    deleteCalendarEvent: builder.mutation<CalendarEventResponse, number>({
      query: (id) => ({
        url: `/api/dashboards/operations/calendar/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Calendar"],
    }),
  }),
});

export const {
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useDeleteCalendarEventMutation,
} = calendarApi;
