/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"; // Added FaTimes for cancel
import {
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/order/orderApi";
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
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

enum OrderStatus {
  PENDING = "pending",
  CONFIRM = "confirm",
  CANCEL = "cancel",
  DELIVERED = "delivered",
}

export default function AllOrderFromAdmin() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");

  const { data: allOrderData, isLoading: isFetching } = useGetAllOrderQuery(
    currentUser?.email
  );
  const [updateOrder] = useUpdateOrderMutation();

  const allOrders = allOrderData?.data as TOrder[];
  if (isFetching)
    return (
      <div className="py-4 text-center">
        <LoadingSpinner loading={isFetching} />
      </div>
    );

  const handleEdit = (order: TOrder) => {
    setEditingId(order?._id);
    setSelectedStatus(order?.status);
  };

  const handleCancel = () => {
    setEditingId(null);
    setSelectedStatus("");
  };

  const handleSave = async () => {
    if (!editingId || !selectedStatus) return;
    const toastID = toast.loading("Updating order status...");
    try {
      const updatedOrderData = {
        status: selectedStatus,
        id: editingId,
      };
      console.log(updatedOrderData);
      const res = await updateOrder({
        id: editingId,
        status: selectedStatus,
      }).unwrap();
      // console.log(res);
      toast.success(res?.message || "Order status updated successfully!", {
        id: toastID,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update order status", {
        id: toastID,
      });
      console.error(error);
    }
    setEditingId(null);
    setSelectedStatus("");
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-xl font-bold">All Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Cover</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Ordered By</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders?.length > 0 ? (
            allOrders.map((order) => (
              <TableRow key={order?._id}>
                <TableCell>
                  <img
                    src={order?.product?.image}
                    alt={order?.product?.name}
                    className="object-cover w-12 h-12 rounded"
                  />
                </TableCell>
                <TableCell>{order?.product?.name}</TableCell>
                <TableCell>{order?.userId?.name}</TableCell>
                <TableCell>${order?.totalPrice}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>
                  {order?.userId?.address?.trim()
                    ? order?.userId?.address
                    : "Address not provided"}
                </TableCell>
                <TableCell className="capitalize">
                  {order?.paymentMethod}
                  {order?.paymentMethod.toLowerCase() === "stripe" &&
                    order?.transactionId && (
                      <p className="mt-1 text-xs text-gray-500">
                        Transaction ID: {order?.transactionId}
                      </p>
                    )}
                </TableCell>
                <TableCell>
                  {editingId === order?._id ? (
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        setSelectedStatus(value as OrderStatus)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(OrderStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    order?.status.charAt(0).toUpperCase() +
                    order?.status.slice(1)
                  )}
                </TableCell>
                <TableCell className="flex space-x-2">
                  {editingId === order._id ? (
                    <>
                      <Button
                        variant="outline"
                        className="text-white bg-green-600 hover:bg-green-500"
                        onClick={handleSave}
                      >
                        <FaSave className="mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        className="text-white bg-red-600 hover:bg-red-500"
                        onClick={handleCancel}
                      >
                        <FaTimes className="mr-1" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => handleEdit(order)}
                    >
                      <FaEdit className="mr-1" />
                      Update
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="py-4 text-center text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
