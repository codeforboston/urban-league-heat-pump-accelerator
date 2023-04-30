import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

const sortById = (a, b) => b.id - a.id;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),

  tagTypes: ["Home", "Surveyor", "Survey", "SurveyVisit"],
  endpoints: (builder) => ({
    /* Homes Endpoints */
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

    /* Surveyors Endpoints*/
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
    getSurveysData: builder.query({
      query: () => ({ url: "/surveys", method: "get" }),
      transformResponse: (res) => res.sort(sortById),
      providesTags: [{ type: "Survey" }],
    }),
    getSurveyData: builder.query({
      query: (id) => ({
        url: `/surveys/${id}`,
        method: "get",
      }),
    }),
    createSurveyData: builder.mutation({
      query: (body) => ({
        url: `/surveys`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Survey"],
    }),
    updateSurveyData: builder.mutation({
      query: (item) => ({
        url: `/surveys/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Survey"],
    }),
    deleteSurveyData: builder.mutation({
      query: (item) => ({
        url: `/surveys/${item.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Survey"],
    }),
    // mocking surveyorView data
    // getAssigment within surveyor view
    // Is this endpoint still used?
    getSurveyorAssigment: builder.query({
      query: () => ({
        url: `/surveyor/assignment/user1`,
        method: "get",
        mock: SurveyorViewAssigment1,
      }),
    }),

    /* Survey visit endpoints */
    getSurveyVisitsData: builder.query({
      query: () => ({ url: "/survey_visits", method: "get" }),
      providesTags: (result = []) => [
        "SurveyVisit",
        ...result.map(({ id }) => ({ type: "SurveyVisit", id })),
      ],
    }),
    getSurveyVisitData: builder.query({
      query: (id) => ({ url: `/survey_visits/${id}`, method: "get" }),
      providesTags: (result = [], error, arg) => [
        { type: "SurveyVisit", id: arg },
      ],
    }),
    createSurveyVisitData: builder.mutation({
      query: (body) => ({
        url: "/survey_visits",
        method: "post",
        body,
      }),
      invalidatesTags: ["SurveyVisit"],
    }),
    updateSurveyVisitData: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/survey_visits/${id}`,
          method: "put",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyVisit", id: arg.id },
      ],
    }),
    deleteSurveyVisitData: builder.mutation({
      query: (id) => ({
        url: `/survey_visits/${id}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyVisit", id: arg.id },
      ],
    }),

    /* Survey response endpoints */
    getSurveyResponsesData: builder.query({
      query: () => ({ url: "/survey_responses", method: "get" }),
    }),
    getSurveyResponseData: builder.query({
      query: (id) => ({ url: `/survey_responses/${id}`, method: "get" }),
    }),
    createSurveyResponseData: builder.mutation({
      query: (body) => ({
        url: "/survey_responses",
        method: "post",
        body,
      }),
    }),
    updateSurveyResponseData: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/survey_responses/${id}`,
          method: "put",
          body,
        };
      },
    }),
    deleteSurveyResponseData: builder.mutation({
      query: (id) => ({
        url: `/survey_responses/${id}`,
        method: "delete",
      }),
    }),

    /* Survey answer endpoints */
    getSurveyAnswersData: builder.query({
      query: () => ({ url: "/survey_answers", method: "get" }),
    }),
    getSurveyAnswerData: builder.query({
      query: (id) => ({ url: `/survey_answers/${id}`, method: "get" }),
    }),
    createSurveyAnswerData: builder.mutation({
      query: (body) => ({
        url: "/survey_answers",
        method: "post",
        body,
      }),
    }),
    updateSurveyAnswerData: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/survey_answers/${id}`,
          method: "put",
          body,
        };
      },
    }),
    deleteSurveyAnswerData: builder.mutation({
      query: (id) => ({
        url: `/survey_answers/${id}`,
        method: "delete",
      }),
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
  useDeleteSurveyDataMutation,
  useUpdateSurveyDataMutation,
  useCreateSurveyDataMutation,
  useGetSurveysDataQuery,
  useGetSurveyDataQuery,

  // Survey visit
  useCreateSurveyVisitDataMutation,
  useUpdateSurveyVisitDataMutation,
  useDeleteSurveyVisitDataMutation,
  useGetSurveyVisitsDataQuery,
  useGetSurveyVisitDataQuery,

  // Survey response
  useCreateSurveyResponseDataMutation,
  useUpdateSurveyResponseDataMutation,
  useDeleteSurveyResponseDataMutation,
  useGetSurveyResponsesDataQuery,
  useGetSurveyResponseDataQuery,

  // Survey answer
  useCreateSurveyAnswerDataMutation,
  useUpdateSurveyAnswerDataMutation,
  useDeleteSurveyAnswerDataMutation,
  useGetSurveyAnswersDataQuery,
  useGetSurveyAnswerDataQuery,
} = apiSlice;
