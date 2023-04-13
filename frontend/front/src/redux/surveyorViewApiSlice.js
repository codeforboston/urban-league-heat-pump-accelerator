import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// This custom base query function checks the availability of the local API
// and the Vercel-hosted API. It sets the base URL according to the API
// that is available, so you don't need to manually change the base URL.
//
// To access and visualize the data from the Vercel-hosted API, simply
// visit the API endpoint URLs using the Vercel deployment domain
// (e.g., https://https://bhpa.vercel.app/api/your-endpoint).

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_VERCEL_API_URL;

// Define a service using a base URL and expected endpoints
export const surveyorViewApiSlice = createApi({
  reducerPath: "surveyorViewApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getSurveyorAssignment: builder.query({
      query: () => "/assignments",
    }),
    deleteSurveyorAssignment: builder.query({
      query: () => "/surveyorViewAssignment",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSurveyorAssignmentQuery } = surveyorViewApiSlice;
