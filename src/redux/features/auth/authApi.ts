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
      invalidatesTags: ["users"],
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
        };
      },

      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ email, ...rest }) => ({
        url: `/auth/update-user/${email}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authApi;
