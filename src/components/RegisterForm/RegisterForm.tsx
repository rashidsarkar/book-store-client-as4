import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [registrationUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Show loading toast

    const toastID = toast.loading("Registering...");

    console.log("Register Data:", data);
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log(userInfo);
      const res = await registrationUser(userInfo).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user: user, token: res.data.token }));
      // const user = verifyToken(res.data.accessToken) as TUser;
      console.log("res", res);
      toast.success(res.data.message, { id: toastID });

      // toast.success("Registration Successful!", {
      //   id: toastId, // Update the same toast
      // });

      // Redirect to login page after successful registration
      navigate("/");
    } catch (error) {
      // toast.error("Registration Failed", {
      //   id: toastId, // Update the same toast
      // });
      toast.error(error?.data?.message, { id: toastID });

      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] w-full bg-gray-100">
      <Card className="max-w-sm mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Create an account by filling in the information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#000957] hover:bg-[#344CB7]"
            >
              Register
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
