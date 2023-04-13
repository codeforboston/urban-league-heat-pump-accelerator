import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.REACT_APP_API_URL;

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
