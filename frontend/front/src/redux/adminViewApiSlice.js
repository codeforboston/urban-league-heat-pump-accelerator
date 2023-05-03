import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.API_URL || "http://localhost:3001";

console.log("baseUrl", baseUrl);

// Define a service using a base URL and expected endpoints
export const surveyorViewApiSlice = createApi({
  reducerPath: "surveyorViewApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAdminHomes: builder.query({
      query: () => "/homes",
    }),
    getAdminUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSurveyorAssignmentQuery } = surveyorViewApiSlice;
