import { mainApi } from "./index";

const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // register user
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    // login user
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = authApi;

// usage: const [register, {isSuccess, data}] = useRegisterMutation()
