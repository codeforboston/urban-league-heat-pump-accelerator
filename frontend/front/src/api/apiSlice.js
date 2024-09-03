import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AUTHORIZATION_HEADER } from "../features/login/loginUtils";
import { transformSurveyorKeys } from "../features/surveyor/surveyorUtils";

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
    // "PublicSurveyVisit",
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
    getUnassignedIncompleteHomes: builder.query({
      query: () => "/homes?assignment_id&completed",
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
      query: (home) => ({
        url: `/homes/${home.id}`,
        method: "PUT",
        body: home,
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
      transformResponse: (result) => result && transformSurveyorKeys(result),
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
      query: (surveyor) => ({
        url: `/surveyors/${surveyor.id}`,
        method: "PUT",
        body: surveyor,
      }),
      transformResponse: (result) => result && transformSurveyorKeys(result),
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
      query: (survey) => ({
        url: `/surveys/${survey.id}`,
        method: "PUT",
        body: survey,
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
      // invalidate Assignment and Home so that the dashboard updates appropriately
      invalidatesTags: (result, error, arg) => [
        "SurveyVisit",
        "Assignment",
        { type: "Home", id: arg.surveyVisit.home_id },
      ],
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
      query: ({ id, body }) => {
        return {
          url: `/survey_responses/${id}`,
          method: "PUT",
          body,
        };
      },
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
      query: ({ id, body }) => {
        return {
          url: `/survey_answers/${id}`,
          method: "PUT",
          body,
        };
      },
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
    getAssignmentsForSurveyor: builder.query({
      query: (surveyorId) => `/assignments?surveyor_id=${surveyorId}`,
      transformResponse: (res) =>
        res
          ? res
              .map((a) => ({
                ...a,
                // derive assignment completeness from home completeness
                completed: a.homes.every((h) => h.completed === true),
              }))
              .sort(sortById)
          : [],
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
      query: (assignment) => ({
        url: `/assignments/${assignment.id}`,
        method: "PUT",
        body: assignment,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Assignment", id: arg.id },
      ],
    }),
    addAssignmentsToSurveyor: builder.mutation({
      query: ({ surveyorId, assignmentIds }) => ({
        url: "/assignments_surveyors",
        method: "POST",
        body: { surveyor_id: surveyorId, assignment_ids: assignmentIds },
      }),
      invalidatesTags: (result, error, arg) => [
        "Assignment",
        "Surveyor",
        ...arg.assignmentIds.map((a) => ({ type: "Assignment", id: a })),
        { type: "Surveyor", id: arg.surveyorId },
      ],
    }),
    removeAssignmentsFromSurveyor: builder.mutation({
      query: ({ surveyorId, assignmentIds }) => ({
        url: "/assignments_surveyors",
        method: "DELETE",
        body: { surveyor_id: surveyorId, assignment_ids: assignmentIds },
      }),
      invalidatesTags: (result, error, arg) => [
        "Assignment",
        "Surveyor",
        ...arg.assignmentIds.map((a) => ({ type: "Assignment", id: a })),
        { type: "Surveyor", id: arg.surveyorId },
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
    createUser: builder.mutation({
      query: ({ email, role, surveyor }) => ({
        url: "/admin/users",
        method: "POST",
        body: {
          user: { email, role, surveyor },
        },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/users/password",
        method: "POST",
        body: { user: { email } },
      }),
    }),
    validateResetToken: builder.mutation({
      query: (resetPasswordToken) => ({
        url: `/users/password/validate_reset_token?reset_password_token=${resetPasswordToken}`,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetPasswordToken, password }) => ({
        url: "/users/password/",
        method: "PUT",
        body: {
          user: {
            reset_password_token: resetPasswordToken,
            password,
          },
        },
      }),
      transformResponse: (response) => {
        // Response always 200 success. If failed, id is null
        if (!response?.id) {
          return { success: false };
        } else {
          return { success: true };
        }
      },
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
  useGetUnassignedIncompleteHomesQuery,

  //Sessions
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreateUserMutation,
  useRequestPasswordResetMutation,
  useValidateResetTokenMutation,
  useResetPasswordMutation,

  // Survey
  useDeleteSurveyMutation,
  useUpdateSurveyMutation,
  useCreateSurveyMutation,
  useGetSurveysQuery,
  useGetSurveyStructureQuery,

  // Survey visit
  useCreateSurveyVisitMutation,
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
  useGetAssignmentsForSurveyorQuery,
  useGetAssignmentQuery,

  useAddAssignmentsToSurveyorMutation,
  useRemoveAssignmentsFromSurveyorMutation,

  // Property assessments
  useGetPropertyAssessmentsQuery,
} = apiSlice;
