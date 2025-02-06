import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUser: builder.query({
    //   query: () => {
    //     return {
    //       url: `auth/getAllUsers`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["order", "book"],
    // }),

    addOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: `order`,
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: ["book", "order"],
    }),
    addOrderWithPaymentId: builder.mutation({
      query: (orderData) => {
        return {
          url: `order/create-order-with-Payment`,
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: ["book", "order"],
    }),

    // updateBook: builder.mutation({
    //   query: (bookInfo) => {
    //     const { id } = bookInfo;
    //     // console.log(bookInfo);

    //     return {
    //       url: `book/${id}`,
    //       method: "PATCH",
    //       body: bookInfo,
    //     };
    //   },
    //   invalidatesTags: ["book"],
    // }),
    // getBookById: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `book/book/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["book"],
    // }),
    // detedBookById: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `book/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["book"],
    // }),
  }),
});

export const { useAddOrderMutation, useAddOrderWithPaymentIdMutation } =
  orderApi;
// register: builder.mutation({
//     query: (userInfo) => ({
//       url: "/auth/register",
//       method: "POST",
//       body: userInfo,
//     }),
//     invalidatesTags: ["users"],
//   }),
