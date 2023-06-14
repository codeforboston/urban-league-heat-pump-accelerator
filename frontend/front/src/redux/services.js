import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// below are just samples to test, ideally put baseUrl into config and tokens into .env
export const BASEURL = "https://ttfqmqhonaugkltamthc.supabase.co/rest/v1/";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0ZnFtcWhvbmF1Z2tsdGFtdGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAyNTgwNzMsImV4cCI6MTk2NTgzNDA3M30.tABI9G85wsCIP8DJYLSPEojOsVL18IdRgzNiB-ItDLE";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers) => {
      headers.set("apiKey", TOKEN);
      return headers;
    },
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    // key names will be used to auto-gen hooks
    getAll: builder.query({
      query: () => "items",
      providesTags: [{ type: "Items", id: "LIST" }], // like RQ query key to invalidateQuery
    }),
    updateItems: builder.mutation({
      query(item) {
        return {
          url: "items",
          method: "POST",
          body: item,
        };
      },
      // invalidatesTags automatically reruns GET query w/ same tags/keys if POST succeeds
      invalidatesTags: [{ type: "Items", id: "LIST" }],
    }),
  }),
});
