/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../../../redux/features/auth/authApi";
import { TBook } from "../../../../types/book.type";

import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { toast } from "sonner";

import {
  useAddOrderMutation,
  useAddOrderWithPaymentIdMutation,
} from "../../../../redux/features/order/orderApi";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading: orderLoading, error }] =
    useAddOrderMutation();
  const [addOrderWithID, { isLoading: paymentLoading }] =
    useAddOrderWithPaymentIdMutation();
  const user = useAppSelector(selectCurrentUser);
  const { state } = useLocation();

  const { data: currentUser, isLoading } = useGetSingleUserQuery({
    email: user?.email,
  });
  const book = state as TBook;

  const stripe = useStripe();
  const elements = useElements();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [transactionId, setTransactionId] = useState("");

  const form = useForm({
    defaultValues: {
      name: currentUser?.data?.name || "",
      email: currentUser?.data?.email || "",
      quantity: 1,
    },
  });
  if (!book) {
    navigate("/");
    return null; // Prevent rendering further
  }
  const totalPrice = (book.price * form.watch("quantity")).toFixed(2);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding order...");
    if (data.quantity > book.quantity) {
      toast.error("Quantity exceeds available stock", { id: toastId });
      return;
    }

    const orderData: any = {
      product: book._id,
      quantity: Number(data.quantity),
      userId: currentUser?.data._id,
      paymentMethod: selectedPayment,
      totalPrice: Number(totalPrice),
    };

    if (selectedPayment === "stripe") {
      if (!stripe || !elements) {
        toast.error("Stripe is not properly initialized.", { id: toastId });
        return;
      }

      // Step 1: Create order and get clientSecret from the backend
      try {
        const orderResponse = await createOrder(orderData).unwrap();

        const clientSecret = orderResponse?.data?.clientSecret;

        if (!clientSecret) {
          toast.error("Failed to get client secret", { id: toastId });
          return;
        }

        // Step 2: Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: currentUser?.data?.name || "Guest",
                email: currentUser?.data?.email || "guest@example.com",
              },
            },
          }
        );

        if (error) {
          console.log(error);
          toast.error(error.message || "Payment failed", { id: toastId });
          return;
        }

        if (paymentIntent?.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          toast.success("Payment successful!", { id: toastId });
          console.log(paymentIntent.id);
          const fullOrderDetails = {
            ...orderData,
            transactionId: paymentIntent.id,
          };
          // Update order with transaction ID
          const resultWithPaymentID = await addOrderWithID({
            ...orderData,
            transactionId: paymentIntent.id,
          });
          console.log(resultWithPaymentID);
          navigate(`/books`);
          return;
        } else {
          toast.error("Payment failed", { id: toastId });
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        toast.error("Failed to complete payment.", { id: toastId });
      }
    } else {
      // Cash on Delivery flow
      try {
        await createOrder(orderData).unwrap();
        toast.success("Order placed successfully! Pay on delivery.", {
          id: toastId,
        });
        navigate(`/books`);
      } catch (error) {
        console.log(error);
        toast.error("Failed to create order.", { id: toastId });
      }
    }
  };
  return (
    <div className="max-w-4xl p-6 mx-auto">
      {isLoading && <LoadingSpinner loading={isLoading} />}
      <Card className="mb-6">
        <CardHeader className="text-xl font-bold ">
          <div className="flex justify-between">
            <p>Product Details</p>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src={book.image}
            alt={book.name}
            className="object-cover w-24 h-24 rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold">{book.name}</h2>
            <p className="text-gray-600">${book.price} / unit</p>
            <p className="text-sm text-gray-500">Available: {book.quantity}</p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="mb-6">
            <CardHeader className="text-xl font-bold">
              User Information
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={currentUser?.data.name}
                        defaultValue={currentUser?.data.name}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={currentUser?.data?.email}
                        defaultValue={currentUser?.data?.email}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="text-xl font-bold">
              Payment Method
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe">Credit/Debit Card (Stripe)</Label>
                </div>
              </RadioGroup>

              {selectedPayment === "stripe" && (
                <div className="p-4 mt-4 border rounded-lg">
                  <CardElement className="p-2 border rounded" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Price</h3>
                <span className="text-2xl font-bold text-primary">
                  ${totalPrice}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full text-lg">
            Complete Purchase
          </Button>

          {transactionId && (
            <p className="mt-4 text-green-600">
              Your Transaction ID: {transactionId}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
