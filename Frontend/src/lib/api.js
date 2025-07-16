import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryString } from "./features/queryString";

// Define a service using a base URL and expected endpoints
export const reportApi = createApi({
  reducerPath: "reportApi",

  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // GET request for lostitem endpoint |  query = GET
    getLostReports: builder.query({
      query: (filters) => {
        const queryString = buildQueryString(filters);
        return `lostitem?${queryString}`;
      },
    }),
    // GET request for finditem endpoint |  query = GET
    getFoundReports: builder.query({
      query: (filters) => {
        const queryString = buildQueryString(filters);
        return `founditem?${queryString}`;
      },   
    }),
    getCategories: builder.query({
      query: () => `category`,
    }),
    // POST request for lostitem endpoint |  body = POST
    createLostReports: builder.mutation({
      query: (body) => ({
        url: "lostitem",
        method: "POST",
        body,
      }),
    }),
    // POST request for found endpoint |  body = POST
    createFoundReports: builder.mutation({
      query: (body) => ({
        url: "founditem",
        method: "POST",
        body,
      }),
    }),
    updateLostReport: builder.mutation({
      query: ({ id, body }) => ({
        url: `lostitem/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    updateFoundReport: builder.mutation({
      query: ({ id, body }) => ({
        url: `founditem/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    getLostReportById: builder.query({
      query: (id) => `lostitem/${id}`,
    }),
    getFoundReportById: builder.query({
      query: (id) => `founditem/${id}`,
    }),
    getDashboardData: builder.query({
      query: () => `dashboard`,
    }),
  }),
});

export const {
  useGetLostReportsQuery,
  useGetFoundReportsQuery,
  useGetCategoriesQuery,
  useCreateLostReportsMutation,
  useUpdateLostReportMutation,
  useCreateFoundReportsMutation,
  useUpdateFoundReportMutation,
  useGetLostReportByIdQuery,
  useGetFoundReportByIdQuery,
  useGetDashboardDataQuery,
} = reportApi;

