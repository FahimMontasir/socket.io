import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://localhost:5000/api/v1";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  // tagTypes: ["All invalidation tags here"],
  keepUnusedDataFor: 3600,
  endpoints: () => ({}),
});
