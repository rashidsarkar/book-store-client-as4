import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `auth/getAllUsers`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    blockUser: builder.mutation({
      query: (userInfo) => {
        const { key, setStatusTo } = userInfo;
        console.log(setStatusTo);

        return {
          url: `admin/users/${key}/block`,
          method: "PATCH",
          body: setStatusTo,
        };
      },
      invalidatesTags: ["users"],
    }),
    addBook: builder.mutation({
      query: (bookInfo) => {
        return {
          url: `book`,
          method: "POST",
          body: bookInfo,
        };
      },
      invalidatesTags: ["book"],
    }),
    getBooks: builder.query({
      query: ({ search, sortBy, sortOrder, filter }) => {
        // Construct query parameters
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (filter) params.append("filter", filter);

        return {
          url: `book?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useBlockUserMutation,
  useAddBookMutation,
  useGetBooksQuery,
} = adminApi;
// register: builder.mutation({
//     query: (userInfo) => ({
//       url: "/auth/register",
//       method: "POST",
//       body: userInfo,
//     }),
//     invalidatesTags: ["users"],
//   }),
