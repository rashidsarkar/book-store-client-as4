import { baseApi } from "../../api/baseApi";
import { RootState } from "../../store";

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
      query: (passwordData) => ({
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
          url: `auth/getSingleUser?${params.toString()}`,
          method: "GET",
          // headers: (getState) => {
          //   const token = (getState() as RootState).auth.token;
          //   console.log(" token from authAPI", token);
          //   return {
          //     Authorization: token ? `Bearer ${token}` : "",
          //   };
          // },
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
