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
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    const toastID = toast.loading("Logging in...");

    // await login();
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res);
      toast.success(res.message, { id: toastID });
      const user = verifyToken(res?.data?.token);
      dispatch(setUser({ user: user, token: res.data.token }));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message, { id: toastID });
    }

    // Redirect to home page after login
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] w-full bg-gray-100">
      <Card className="max-w-sm mx-auto ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>

          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              Login
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
