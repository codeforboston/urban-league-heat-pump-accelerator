import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
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
} = apiSlice;
