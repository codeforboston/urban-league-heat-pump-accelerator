import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Survey from "../dummyData/Survey.json";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

const mockSurvey = Survey;

const mockBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  ({ mock }) => {
    return { data: mock };
  };

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  // TODO: remove mock when connecting to Real API
  baseQuery: mockBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  // prepareHeaders: (headers) => {
  //   headers.set("apiKey", "TOKEN");
  //   return headers;
  // },
  tagTypes: ["Home"],
  endpoints: (builder) => ({
    //Home section of the slice
    getHomeData: builder.query({
      query: () => "/home",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: [{ type: "Home" }],
    }),
    createHomeData: builder.mutation({
      query: (home) => ({
        url: `/home`,
        method: "POST",
        body: home,
      }),
      invalidatesTags: ["Home"],
    }),
    updateHomeData: builder.mutation({
      query: (item) => ({
        url: `/home/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Home"],
    }),
    deleteHomeData: builder.mutation({
      query: (item) => ({
        url: `/home/${item.id}`,
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
      // TODO: remove mock when connecting to Real API
      query: () => ({ url: "/survey", method: "get", mock: Survey }),
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
  useGetHomeDataQuery,

  // Survey
  useGetSurveyListQuery,
} = apiSlice;
