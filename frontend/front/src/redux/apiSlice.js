import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Survey from "../dummyData/Survey.json";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

// This custom base query function checks the availability of the local API
// and the Vercel-hosted API. It sets the base URL according to the API
// that is available, so you don't need to manually change the base URL.
//
// To access and visualize the data from the Vercel-hosted API, simply
// visit the API endpoint URLs using the Vercel deployment domain
// (e.g., https://https://bhpa.vercel.app/api/your-endpoint).
async function customBaseQuery(args, api, extraOptions) {
  const localApiUrl = process.env.REACT_APP_LOCAL_API_URL;
  const vercelApiUrl = process.env.REACT_APP_VERCEL_API_URL;

  // Check if the local API is available
  const isLocalApiAvailable = await fetch(localApiUrl)
    .then((response) => response.ok)
    .catch(() => false);

  // Set the base URL depending on the availability of the local API
  const baseUrl = isLocalApiAvailable ? localApiUrl : vercelApiUrl;

  // Call the baseFetch function with the updated baseUrl
  const baseFetch = fetchBaseQuery({ baseUrl });
  return baseFetch(args, api, extraOptions);
}

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  // TODO: remove mock when connecting to Real API
  // baseQuery: mockBaseQuery({
  //   baseUrl: "http://localhost:3500",
  // }),
  baseQuery: customBaseQuery,
  // prepareHeaders: (headers) => {
  //   headers.set("apiKey", "TOKEN");
  //   return headers;
  // },
  tagTypes: ["Home"],
  endpoints: (builder) => ({
    //Home section of the slice
    getHomesData: builder.query({
      query: () => "/homes",
      transformResponse: (res) => (res ? res.sort((a, b) => a.id - b.id) : []),
      providesTags: [{ type: "Home" }],
    }),
    getHomeData: builder.query({
      query: (id) => `/homes/${id}`,
    }),
    createHomeData: builder.mutation({
      query: (home) => ({
        url: `/homes`,
        method: "POST",
        body: home,
        mock: home,
      }),
      invalidatesTags: ["Home"],
    }),
    updateHomeData: builder.mutation({
      query: (item) => ({
        url: `/homes/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Home"],
    }),
    deleteHomeData: builder.mutation({
      query: (item) => ({
        url: `/homes/${item.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Home"],
    }),
    // user section of the slice
    getUserData: builder.query({
      query: () => "/user",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: [{ type: "User" }],
    }),
    createUserData: builder.mutation({
      query: (user) => ({
        url: `/user`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserData: builder.mutation({
      query: (item) => ({
        url: `/user/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserData: builder.mutation({
      query: (item) => ({
        url: `/user/${item.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["User"],
    }),
    /* Survey Endpoints */
    getSurveyList: builder.query({
      query: () => ({ url: "/surveys", method: "get" }),
    }),
    // mocking surveyorView data
    // getAssigment within surveyor view
    getSurveyorAssigment: builder.query({
      query: () => ({
        url: `/surveyor/assignment/user1`,
        method: "get",
        mock: SurveyorViewAssigment1,
      }),
    }),
    getSurveyStructure: builder.query({
      query: (id) => ({
        url: `/surveys/${id}`,
        method: "get",
      }),
    }),
    /* Survey visit endpoints */
    postSurveyVisit: builder.mutation({
      query: (body) => ({
        url: "/homesurvey",
        method: "post",
        body,
      }),
    }),
    getSurveyVisits: builder.query({
      query: () => ({ url: "/homesurvey", method: "get" }),
    }),
    getSurveyVisit: builder.query({
      query: (id) => ({ url: `/homesurvey/${id}`, method: "get" }),
    }),
    putSurveyVisit: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/homesurvey/${id}`,
          method: "put",
          body,
        };
      },
    }),
    deleteSurveyVisit: builder.mutation({
      query: (id) => ({
        url: `/homesurvey/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  //user
  useDeleteUserDataMutation,
  useUpdateUserDataMutation,
  useCreateUserDataMutation,
  useGetUserDataQuery,

  //Home
  useDeleteHomeDataMutation,
  useUpdateHomeDataMutation,
  useCreateHomeDataMutation,
  useGetHomesDataQuery,
  useGetHomeDataQuery,

  // Survey
  useGetSurveyListQuery,
  useGetSurveyStructureQuery,

  // Survey visit
  usePostSurveyVisitMutation,
  useGetSurveyVisitsQuery,
  useGetSurveyVisitQuery,
  usePutSurveyVisitMutation,
  useDeleteSurveyVisitMutation,
} = apiSlice;
