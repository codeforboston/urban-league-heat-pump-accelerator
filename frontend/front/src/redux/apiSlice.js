import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Survey from "../dummyData/Survey.json";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

// const baseUrl = "http://localhost:3001";
const baseUrl = process.env.API_URL;

console.log("baseUrl", baseUrl);

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  // TODO: remove mock when connecting to Real API
  // baseQuery: mockBaseQuery({
  //   baseUrl: "http://localhost:3500",
  // }),
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  // prepareHeaders: (headers) => {
  //   headers.set("apiKey", "TOKEN");
  //   return headers;
  // },
  tagTypes: ["Home", "SurveyVisit"],
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
      invalidatesTags: ["SurveyVisit"],
    }),
    getSurveyVisits: builder.query({
      query: () => ({ url: "/homesurvey", method: "get" }),
      providesTags: (result = []) => [
        "SurveyVisit",
        ...result.map(({ id }) => ({ type: "SurveyVisit", id })),
      ],
    }),
    getSurveyVisit: builder.query({
      query: (id) => ({ url: `/homesurvey/${id}`, method: "get" }),
      providesTags: (result = [], error, arg) => [
        { type: "SurveyVisit", id: arg },
      ],
    }),
    putSurveyVisit: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/homesurvey/${id}`,
          method: "put",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyVisit", id: arg.id },
      ],
    }),
    deleteSurveyVisit: builder.mutation({
      query: (id) => ({
        url: `/homesurvey/${id}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyVisit", id: arg.id },
      ],
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
