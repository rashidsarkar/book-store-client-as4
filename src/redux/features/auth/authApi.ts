import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "auth/change-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
    getSingleUser: builder.query({
      query: (userInfo) => {
        const params = new URLSearchParams();
        if (userInfo?.email) {
          params.append("email", userInfo.email);
        }
        return {
          url: `auth/getAllUser?${params.toString()}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useGetSingleUserQuery,
} = authApi;
