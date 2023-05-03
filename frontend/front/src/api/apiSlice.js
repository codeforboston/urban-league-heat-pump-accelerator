import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SurveyorViewAssigment1 from "../dummyData/surveyorView/assignment1.json";

const sortById = (a, b) => b.id - a.id;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),

  tagTypes: ["Home", "Surveyor", "Survey", "SurveyVisit", "Assignment", "PropertyAssessment"],
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
      query: (home) => ({
        url: `/homes/${home.id}`,
        method: "PUT",
        body: home,
      }),
      invalidatesTags: ["Home"],
    }),
    deleteHomeData: builder.mutation({
      query: (home) => ({
        url: `/homes/${home.id}`,
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
      query: (surveyor) => `/surveyors/${surveyor.id}`,
    }),
    createSurveyorData: builder.mutation({
      query: (surveyor) => ({
        url: `/surveyors`,
        method: "POST",
        body: surveyor,
      }),
      invalidatesTags: ["Surveyor"],
    }),
    updateSurveyorData: builder.mutation({
      query: (surveyor) => ({
        url: `/surveyors/${surveyor.id}`,
        method: "PUT",
        body: surveyor,
      }),
      invalidatesTags: ["Surveyor"],
    }),
    deleteSurveyorData: builder.mutation({
      query: (surveyor) => ({
        url: `/surveyors/${surveyor.id}`,
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
    getSurveyStructure: builder.query({
      query: (id) => ({
        url: `/surveys/${id}`,
        method: "get",
      }),
    }),
    createSurveyData: builder.mutation({
      query: (survey) => ({
        url: `/surveys`,
        method: "POST",
        body: survey,
      }),
      invalidatesTags: ["Survey"],
    }),
    updateSurveyData: builder.mutation({
      query: (survey) => ({
        url: `/surveys/${survey.id}`,
        method: "PUT",
        body: survey,
      }),
      invalidatesTags: ["Survey"],
    }),
    deleteSurveyData: builder.mutation({
      query: (survey) => ({
        url: `/surveys/${survey.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Survey"],
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
      query: (surveyVisit) => ({
        url: "/survey_visits",
        method: "post",
        body: surveyVisit,
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
      query: (surveyResponse) => ({
        url: "/survey_responses",
        method: "post",
        body: surveyResponse,
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
      query: (surveyAnswer) => ({
        url: "/survey_answers",
        method: "post",
        body: surveyAnswer,
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

    /* Assignment endpoints*/

    getAssignmentsData: builder.query({
      query: () => "/assignments",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: [{ type: "Assignment" }],
    }),
    getAssignmentData: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    createAssignmentData: builder.mutation({
      query: (assignment) => ({
        url: `/assignments`,
        method: "POST",
        body: assignment,
      }),
      invalidatesTags: ["Assignment"],
    }),
    updateAssignmentData: builder.mutation({
      query: (assignment) => ({
        url: `/assignments/${assignment.id}`,
        method: "PUT",
        body: assignment,
      }),
      invalidatesTags: ["Assignment"],
    }),
    deleteAssignmentData: builder.mutation({
      query: (assignment) => ({
        url: `/assignments/${assignment.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Assignment"],
    }),

    /* Property assessment endpoints*/
    getPropertyAssessmentsData: builder.query({
      query: () => "/property_assessments",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: [{ type: "PropertyAssessment" }],
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
  useGetSurveyStructureQuery,

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

  // Assignment
  useCreateAssignmentDataMutation,
  useUpdateAssignmentDataMutation,
  useDeleteAssignmentDataMutation,
  useGetAssignmentsDataQuery,
  useGetAssignmentDataQuery,

  // Property assessments
  useGetPropertyAssessmentsDataQuery,
} = apiSlice;
