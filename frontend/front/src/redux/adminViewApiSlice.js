import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";
// This custom base query function checks the availability of the local API
// and the Vercel-hosted API. It sets the base URL according to the API
// that is available, so you don't need to manually change the base URL.
//
// To access and visualize the data from the Vercel-hosted API, simply
// visit the API endpoint URLs using the Vercel deployment domain
// (e.g., https://https://bhpa.vercel.app/api/your-endpoint).
// async function customBaseQuery(args, api, extraOptions) {
//   const localApiUrl = "http://localhost:3001";
//   const vercelApiUrl = "https://bhpa.vercel.app/api";

//   // Check if the local API is available
//   const isLocalApiAvailable = await fetch(localApiUrl)
//     .then((response) => response.ok)
//     .catch(() => false);

//   // Set the base URL depending on the availability of the local API
//   const baseUrl = isLocalApiAvailable ? localApiUrl : vercelApiUrl;

//   // Call the baseFetch function with the updated baseUrl
//   const baseFetch = fetchBaseQuery({ baseUrl });
//   return baseFetch(args, api, extraOptions);
// }

dotenv.config();

const baseUrl = process.env.REACT_APP_API_URL;

// Define a service using a base URL and expected endpoints
export const surveyorViewApiSlice = createApi({
  reducerPath: "surveyorViewApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

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
