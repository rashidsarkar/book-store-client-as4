import { useState } from "react";
import { useGetAllOrderForMeQuery } from "../../../redux/features/order/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { TOrder } from "../../../types/order.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function AllOrderFromUser() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: allOrderData, isFetching } = useGetAllOrderForMeQuery(
    currentUser?.email
  );

  const allOrders = allOrderData?.data as TOrder[];
  if (isFetching)
    return (
      <div className="py-4 text-center">
        <LoadingSpinner loading={isFetching} />
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-xl font-bold">All Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Cover</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Order Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders?.length > 0 ? (
            allOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="object-cover w-12 h-12 rounded"
                  />
                </TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.product.author}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  {order.userId.address?.trim()
                    ? order.userId.address
                    : "Address not provided"}
                </TableCell>
                <TableCell className="capitalize">
                  {order.paymentMethod}
                  {order.paymentMethod.toLowerCase() === "stripe" &&
                    order.transactionId && (
                      <p className="mt-1 text-xs text-gray-500">
                        Transaction ID: {order.transactionId}
                      </p>
                    )}
                </TableCell>
                <TableCell>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-4 text-center text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
