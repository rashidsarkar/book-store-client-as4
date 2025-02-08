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
import { TBook, BookCategory } from "../../../types/book.type";

export default function CreateBook() {
  const [addbook] = useAddBookMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [clearImage, setClearImage] = useState(false);
  const [publicationYear, setPublicationYear] = useState<number | null>(null);

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
      publicationYear: publicationYear ?? null, // Use the number or null
      quantity: Number(data.quantity),
    };

    try {
      const res = await addbook(bookData).unwrap();
      console.log(res);
      toast.success(res?.message || "Book added successfully!", {
        id: toastID,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book!", {
        id: toastID,
      });
    }

    reset();
    setImageUrl(null);
    setPublicationYear(null);
    setClearImage((prev) => !prev);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Add a New Book</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              {/* Author */}
              <div>
                <Label>Author</Label>
                <Input
                  {...register("author", {
                    required: "Author name is required",
                  })}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-sm text-red-500">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be a positive number",
                    },
                  })}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Publication Year */}
              <div>
                <Label>Publication Year</Label>
                <Input
                  type="number"
                  {...register("publicationYear", {
                    required: "Publication year is required",
                    min: {
                      value: 1900,
                      message: "Please enter a valid year",
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: "Year can't be in the future",
                    },
                  })}
                  placeholder="Enter publication year"
                  onChange={(e) => {
                    setPublicationYear(Number(e.target.value));
                  }}
                />
                {errors.publicationYear && (
                  <p className="text-sm text-red-500">
                    {errors.publicationYear.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  {...register("category", {
                    required: "Category is required", // Adding required validation
                  })}
                  onValueChange={(value) =>
                    setValue("category", value as BookCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Science Fiction">
                      Science Fiction
                    </SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: {
                      value: 0,
                      message: "Quantity must be a positive number",
                    },
                  })}
                  placeholder="Enter Quantity"
                />
                {errors.quantity && (
                  <p className="text-sm text-red-500">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Cloudinary Upload */}
              <div>
                <CloudinaryUpload
                  onUpload={(url) => setImageUrl(url)}
                  clearTrigger={clearImage}
                />
              </div>
            </div>

            {/* Description (Full Width) */}
            <div>
              <Label>Description</Label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#577BC1] text-white hover:bg-[#344CB7]"
            >
              Add Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
