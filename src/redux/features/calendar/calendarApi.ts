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
    // --------- Operations Calendar API ---------
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

    //----------End Operations Calendar API ---------

    // --------- Executive Calendar API ---------
        getExecutiveCalendarEvents: builder.query({
      query: () => ({
        url: "/api/dashboards/executive/calendar/",
        method: "GET",
      }),
      providesTags: ["ExecutiveCalendar"],
    }),
    createExecutiveCalendarEvent: builder.mutation({
      query: (body) => ({
        url: "/api/dashboards/executive/calendar/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ExecutiveCalendar"],
    }),
    deleteExecutiveCalendarEvent: builder.mutation({
      query: (id) => ({
        url: `/api/dashboards/executive/calendar/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExecutiveCalendar"],
    }),
    //----------End Executive Calendar API ---------

    // --------- Marketing Manager Calendar API ---------
        getMarketingManagerCalendarEvents: builder.query({
      query: () => ({
        url: "/api/dashboards/marketing/calendar/",
        method: "GET",
      }),
      providesTags: ["MarketingCalendar"],
    }),
    createMarketingManagerCalendarEvent: builder.mutation({
      query: (body) => ({
        url: "/api/dashboards/marketing/calendar/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MarketingCalendar"],
    }),
    deleteMarketingManagerCalendarEvent: builder.mutation({
      query: (id) => ({
        url: `/api/dashboards/marketing/calendar/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MarketingCalendar"],
    }),
    //----------End Marketing Manager Calendar API ---------
  }),
});

export const {
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useDeleteCalendarEventMutation,

  useGetExecutiveCalendarEventsQuery,
  useCreateExecutiveCalendarEventMutation,
  useDeleteExecutiveCalendarEventMutation,
  
  useGetMarketingManagerCalendarEventsQuery,
  useCreateMarketingManagerCalendarEventMutation,
  useDeleteMarketingManagerCalendarEventMutation,
} = calendarApi;
