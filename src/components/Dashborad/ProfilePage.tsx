import { useForm, FieldErrors } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useAppSelector } from "../../redux/hooks";
import {
  useChangePasswordMutation,
  useGetSingleUserQuery,
} from "../../redux/features/auth/authApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
interface FormData {
  oldPassword: string;
  newPassword: string;
}

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.auth.user);
  const userData = useGetSingleUserQuery(profile?.email);
  console.log(userData);

  console.log(profile);
  console.log(token);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: FormData) => {
    console.log("Password Change Request:", data);

    try {
      const res = await changePassword(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-500">Manage your account settings</p>
        </CardHeader>
        <CardContent>
          {/* Change Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Old Password</label>
              <Input
                type="password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
              />
              {errors.oldPassword && (
                <p className="text-sm text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium">New Password</label>
              <Input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                })}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#577BC1] w-full text-white hover:bg-[#344CB7]"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
