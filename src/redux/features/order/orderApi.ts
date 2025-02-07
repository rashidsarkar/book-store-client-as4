import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (userID) => {
        return {
          url: `order/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["order", "book", "users"],
    }),
    getAllOrderForMe: builder.query({
      query: (userID) => {
        return {
          url: `order/get-my-order/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["order", "book", "users"],
    }),

    addOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: `order`,
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: ["book", "order", "users"],
    }),
    addOrderWithPaymentId: builder.mutation({
      query: (orderData) => {
        return {
          url: `order/create-order-with-Payment`,
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: ["book", "order", "users"],
    }),

    updateOrder: builder.mutation({
      query: (orderInfo) => {
        const { id, ...orderWithoutId } = orderInfo;

        return {
          url: `order/update/${id}`,
          method: "PATCH",
          body: orderWithoutId,
        };
      },
      invalidatesTags: ["book", "order", "users"],
    }),
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

export const {
  useAddOrderMutation,
  useAddOrderWithPaymentIdMutation,
  useUpdateOrderMutation,
  useGetAllOrderQuery,
  useGetAllOrderForMeQuery,
} = orderApi;
// register: builder.mutation({
//     query: (userInfo) => ({
//       url: "/auth/register",
//       method: "POST",
//       body: userInfo,
//     }),
//     invalidatesTags: ["users"],
//   }),
