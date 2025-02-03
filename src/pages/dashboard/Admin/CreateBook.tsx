// Import the CloudinaryUpload component

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import CloudinaryUpload from "../../../utils/CloudinaryUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useAddBookMutation } from "../../../redux/features/admin/adminApi";

interface TBook {
  name: string;
  image: string;
  price: number;
  author: string;
  category: string;
}

export default function CreateBook() {
  const [addbook] = useAddBookMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log(imageUrl);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TBook>();

  const onSubmit = async (data: TBook) => {
    if (!imageUrl) {
      toast.error("Please upload an image!");
      return;
    }
    const toastID = toast.loading("Adding a book...");
    const bookData = {
      ...data,
      image: imageUrl,
      price: Number(data.price),
    };
    // console.log("Book Data:", bookData);
    try {
      const res = await addbook(bookData).unwrap();
      console.log(res);
      toast.success(res?.message || "Add Book successfully !", {
        id: toastID,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to add book!", {
        id: toastID,
      });
    }

    reset();
    setImageUrl(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Add a New Book</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Book Name */}
            <div>
              <Label>Book Name</Label>
              <Input
                {...register("name", { required: "Book name is required" })}
                placeholder="Enter book name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Cloudinary Upload Component */}
            <CloudinaryUpload onUpload={(url) => setImageUrl(url)} />

            {/* Price */}
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be a positive number" },
                })}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <Label>Author</Label>
              <Input
                {...register("author", { required: "Author name is required" })}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-sm text-red-500">{errors.author.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Biography">Biography</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-[#577BC1] text-white hover:bg-[#344CB7] w-full"
            >
              Add Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
