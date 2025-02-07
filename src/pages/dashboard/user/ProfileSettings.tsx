/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import {
  useChangePasswordMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";

interface FormData {
  name?: string;
  address?: string;
}

export default function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>();

  const profile = useAppSelector((state) => state.auth.user);
  const { data: currentUser } = useGetSingleUserQuery({
    email: profile?.email,
  });
  console.log(currentUser);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (currentUser?.data) {
      setValue("name", currentUser.data.name);
      setValue("address", currentUser.data.address);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: FormData) => {
    const toastID = toast.loading("Updating profile...");

    const updatedFields: FormData = {};

    if (data.name !== currentUser?.data?.name) {
      updatedFields.name = data.name;
    }
    if (data.address !== currentUser?.data?.address) {
      updatedFields.address = data.address;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.dismiss(toastID);
      toast.info("No changes detected!");
      return;
    }

    try {
      const res = await updateUser({
        email: profile?.email,
        ...updatedFields,
      }).unwrap();
      console.log(res);
      toast.success("Profile updated successfully!", { id: toastID });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile!", {
        id: toastID,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            {currentUser?.data?.name || "N/A"}
          </h2>
          <p className="text-gray-500">Manage your account details</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <Input
                type="text"
                {...register("name")}
                defaultValue={currentUser?.data?.name}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <Input
                type="text"
                {...register("address")}
                defaultValue={currentUser?.data?.address}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#577BC1] w-full text-white hover:bg-[#344CB7]"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
