import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://lfrs.onrender.com/api/" }),
  /*prepareHeaders: async (headers, { getState}) => {
    const token = await window.__clerk_domain.session.getToken();
 
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
   },*/
  endpoints: (builder) => ({
    // GET request for lostitem endpoint |  query = GET
    getLostReports: builder.query({
      query: () => `lostitem`,
    }),
    // GET request for finditem endpoint |  query = GET
    getFoundReports: builder.query({
      query: () => `founditem`,
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
    }),
});

export const { useGetLostReportsQuery, useGetFoundReportsQuery, useGetCategoriesQuery, useCreateLostReportsMutation, useUpdateLostReportMutation, useCreateFoundReportsMutation, useUpdateFoundReportMutation  } = reportApi;

/*
export const getLostReports = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/lostitem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        throw new Error("Failed to get lost reports")
    }

}

export const getFoundReports = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/founditem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json()
        console.log(data)
        return data;
    } catch (error) {
        throw new Error("Failed to get found reports")
    }
}
*/
