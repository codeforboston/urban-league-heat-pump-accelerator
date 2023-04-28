import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

const sortById = (a, b) => b.id - a.id;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  // Should I add: "Surveyor",
  tagTypes: ["Home", "Surveyor"],
  endpoints: (builder) => ({
    //Home section of the slice
    getHomesData: builder.query({
      query: () => "/homes",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
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

    // Surveyors section of the slice
    getSurveyorsData: builder.query({
      query: () => "/surveyors",
      transformResponse: (res) => res.sort(sortById),
      providesTags: [{ type: "Surveyor" }],
    }),
    getSurveyorData: builder.query({
      query: (item) => `/surveyors/${item.id}`,
    }),
    createSurveyorData: builder.mutation({
      query: (user) => ({
        url: `/surveyors`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Surveyor"],
    }),
    updateSurveyorData: builder.mutation({
      query: (item) => ({
        url: `/surveyors/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Surveyor"],
    }),
    deleteSurveyorData: builder.mutation({
      query: (item) => ({
        url: `/surveyors/${item.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Surveyor"],
    }),
    /* Survey Endpoints */
    getSurveyList: builder.query({
      query: () => ({ url: "/surveys", method: "get" }),
      transformResponse: (res) => res.sort(sortById),
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
  // Surveyor
  useDeleteSurveyorDataMutation,
  useUpdateSurveyorDataMutation,
  useCreateSurveyorDataMutation,
  useGetSurveyorDataQuery,
  useGetSurveyorsDataQuery,

  // Home
  useDeleteHomeDataMutation,
  useUpdateHomeDataMutation,
  useCreateHomeDataMutation,
  useGetHomeDataQuery,
  useGetHomesDataQuery,

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
