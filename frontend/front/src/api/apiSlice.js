import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AUTHORIZATION_HEADER } from "../features/login/loginUtils";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

const sortById = (a, b) => a.id - b.id;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().login.token;
      // add auth to every request, if the token exists
      if (token) {
        headers.set(AUTHORIZATION_HEADER, token);
      }
      return headers;
    },
  }),

  tagTypes: [
    "Home",
    "Surveyor",
    "Survey",
    "SurveyVisit",
    "SurveyResponse",
    "SurveyAnswer",
    "Assignment",
    "PropertyAssessment",
  ],
  endpoints: (builder) => ({
    /* Homes Endpoints */
    getHomes: builder.query({
      query: () => "/homes",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: (result = [], error, arg) => [
        "Home",
        ...result.map(({ id }) => ({ type: "Home", id })),
      ],
    }),
    getUnassignedHomes: builder.query({
      query: () => "/homes?assignment_id",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: (result = [], error, arg) => [
        "Home",
        ...result.map(({ id }) => ({ type: "Home", id })),
      ],
    }),
    getHome: builder.query({
      query: (id) => `/homes/${id}`,
      providesTags: (result, error, arg) => [{ type: "Home", id: arg }],
    }),
    createHome: builder.mutation({
      query: ({ home, recaptcha }) => ({
        url: `/homes`,
        method: "POST",
        body: home,
        headers: [[`Recaptcha-Token`, recaptcha]],
      }),
      invalidatesTags: ["Home"],
    }),
    updateHome: builder.mutation({
      query: ({ id, body }) => ({
        url: `homes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Home", id: arg.id }],
    }),
    deleteHome: builder.mutation({
      query: (home) => ({
        url: `/homes/${home.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Home"],
    }),

    /* Surveyors Endpoints*/
    getSurveyors: builder.query({
      query: () => "/surveyors",
      transformResponse: (res) => res.sort(sortById),
      providesTags: (result = [], error, arg) => [
        "Surveyor",
        ...result.map(({ id }) => ({ type: "Surveyor", id })),
      ],
    }),
    // getSurveyorsByAssignmentId: builder.query({
    //   query: (assignment_id) => `/assignments/${assignment_id}`,
    //   transformResponse: (res) => res.surveyor_ids,
    //   providesTags: (result = [], error, arg) => [
    //     "Surveyor",
    //     ...result.map(({ id }) => ({ type: "Surveyor", id })),
    //   ],
    // }),
    getSurveyor: builder.query({
      query: (id) => `/surveyors/${id}`,
      providesTags: (result, error, arg) => [{ type: "Surveyor", id: arg }],
    }),
    createSurveyor: builder.mutation({
      query: (surveyor) => ({
        url: `/surveyors`,
        method: "POST",
        body: surveyor,
      }),
      invalidatesTags: ["Surveyor"],
    }),
    updateSurveyor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/surveyors/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Surveyor", id: arg.id },
      ],
    }),
    deleteSurveyor: builder.mutation({
      query: (surveyor) => ({
        url: `/surveyors/${surveyor.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Surveyor"],
    }),

    /* Survey Endpoints */
    getSurveys: builder.query({
      query: () => ({ url: "/surveys", method: "GET" }),
      transformResponse: (res) => res.sort(sortById),
      providesTags: (result = [], error, arg) => [
        "Survey",
        ...result.map(({ id }) => ({ type: "Survey", id })),
      ],
    }),
    getSurveyStructure: builder.query({
      query: (id) => ({
        url: `/surveys/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Survey", id: arg }],
    }),
    createSurvey: builder.mutation({
      query: (survey) => ({
        url: `/surveys`,
        method: "POST",
        body: survey,
      }),
      invalidatesTags: ["Survey"],
    }),
    updateSurvey: builder.mutation({
      query: ({ id, body }) => ({
        url: `/surveys/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Survey", id: arg.id }],
    }),
    deleteSurvey: builder.mutation({
      query: (survey) => ({
        url: `/surveys/${survey.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Survey"],
    }),

    /* Survey visit endpoints */
    getSurveyVisits: builder.query({
      query: () => ({ url: "/survey_visits", method: "GET" }),
      providesTags: (result = [], error, arg) => [
        "SurveyVisit",
        ...result.map(({ id }) => ({ type: "SurveyVisit", id })),
      ],
    }),
    getSurveyVisit: builder.query({
      query: (id) => ({ url: `/survey_visits/${id}`, method: "GET" }),
      providesTags: (result, error, arg) => [{ type: "SurveyVisit", id: arg }],
    }),
    createSurveyVisit: builder.mutation({
      query: ({ surveyVisit, recaptcha }) => ({
        url: "/survey_visits",
        method: "POST",
        body: surveyVisit,
        headers: [[`Recaptcha-Token`, recaptcha]],
      }),
      invalidatesTags: ["SurveyVisit"],
    }),
    updateSurveyVisit: builder.mutation({
      query: ({ id, body }) => ({
        url: `survey_visits/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyVisit", id: arg.id },
      ],
    }),
    deleteSurveyVisit: builder.mutation({
      query: (id) => ({
        url: `/survey_visits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SurveyVisit"],
    }),

    /* Survey response endpoints */
    getSurveyResponses: builder.query({
      query: () => ({ url: "/survey_responses", method: "GET" }),
      providesTags: (result = [], error, arg) => [
        "SurveyResponses",
        ...result.map(({ id }) => ({ type: "SurveyResponses", id })),
      ],
    }),
    getSurveyResponse: builder.query({
      query: (id) => ({ url: `/survey_responses/${id}`, method: "GET" }),
      providesTags: (result, error, arg) => [
        { type: "SurveyResponse", id: arg },
      ],
    }),
    createSurveyResponse: builder.mutation({
      query: (surveyResponse) => ({
        url: "/survey_responses",
        method: "POST",
        body: surveyResponse,
      }),
      invalidatesTags: ["SurveyResponse"],
    }),
    updateSurveyResponse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/survey_responses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyResponse", id: arg.id },
      ],
    }),
    deleteSurveyResponse: builder.mutation({
      query: (id) => ({
        url: `/survey_responses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SurveyResponse"],
    }),

    /* Survey answer endpoints */
    getSurveyAnswers: builder.query({
      query: () => ({ url: "/survey_answers", method: "GET" }),
      providesTags: (result = [], error, arg) => [
        "SurveyAnswers",
        ...result.map(({ id }) => ({ type: "SurveyAnswers", id })),
      ],
    }),
    getSurveyAnswer: builder.query({
      query: (id) => ({ url: `/survey_answers/${id}`, method: "GET" }),
      providesTags: (result, error, arg) => [{ type: "SurveyAnswer", id: arg }],
    }),
    createSurveyAnswer: builder.mutation({
      query: (surveyAnswer) => ({
        url: "/survey_answers",
        method: "POST",
        body: surveyAnswer,
      }),
      invalidatesTags: ["SurveyAnswer"],
    }),
    updateSurveyAnswer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/survey_answers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SurveyAnswer", id: arg.id },
      ],
    }),
    deleteSurveyAnswer: builder.mutation({
      query: (id) => ({
        url: `/survey_answers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SurveyAnswer"],
    }),

    /* Assignment endpoints*/

    getAssignments: builder.query({
      query: () => "/assignments",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: (result = [], error, arg) => [
        "Assignment",
        ...result.map(({ id }) => ({ type: "Assignment", id })),
      ],
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),
    createAssignment: builder.mutation({
      query: (assignment) => ({
        url: `/assignments`,
        method: "POST",
        body: assignment,
      }),
      invalidatesTags: ["Assignment"],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/assignments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Assignment", id: arg.id },
      ],
    }),
    deleteAssignment: builder.mutation({
      query: (assignment) => ({
        url: `/assignments/${assignment.id}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["Assignment"],
    }),

    /* Property assessment endpoints*/
    getPropertyAssessments: builder.query({
      query: () => "/property_assessments",
      transformResponse: (res) => (res ? res.sort(sortById) : []),
      providesTags: (result = [], error, arg) => [
        "PropertyAssessment",
        ...result.map(({ id }) => ({ type: "PropertyAssessment", id })),
      ],
    }),
    //sessions section of the slice
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/sign_in",
        method: "POST",
        body: { user: { email, password } },
      }),
      invalidatesTags: ["Surveyor"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/sign_out",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Surveyor
  useDeleteSurveyorMutation,
  useUpdateSurveyorMutation,
  useCreateSurveyorMutation,
  useGetSurveyorQuery,
  useGetSurveyorsQuery,
  // useGetSurveyorsByAssignmentIdQuery,

  // Home
  useDeleteHomeMutation,
  useUpdateHomeMutation,
  useCreateHomeMutation,
  useGetHomeQuery,
  useGetHomesQuery,
  useGetUnassignedHomesQuery,

  //Sessions
  useLoginUserMutation,
  useLogoutUserMutation,

  // Survey
  useDeleteSurveyMutation,
  useUpdateSurveyMutation,
  useCreateSurveyMutation,
  useGetSurveysQuery,
  useGetSurveyStructureQuery,

  // Survey visit
  useCreateSurveyVisitMutation,
  useUpdateSurveyVisitMutation,
  useDeleteSurveyVisitMutation,
  useGetSurveyVisitsQuery,
  useGetSurveyVisitQuery,

  // Survey response
  useCreateSurveyResponseMutation,
  useUpdateSurveyResponseMutation,
  useDeleteSurveyResponseMutation,
  useGetSurveyResponsesQuery,
  useGetSurveyResponseQuery,

  // Survey answer
  useCreateSurveyAnswerMutation,
  useUpdateSurveyAnswerMutation,
  useDeleteSurveyAnswerMutation,
  useGetSurveyAnswersQuery,
  useGetSurveyAnswerQuery,

  // Assignment
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
  useGetAssignmentQuery,

  // Property assessments
  useGetPropertyAssessmentsQuery,
} = apiSlice;
