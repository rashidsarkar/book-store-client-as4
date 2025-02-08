/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/admin/adminApi";
import { TBook } from "../../../types/book.type";

export default function UpdateBook() {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm<TBook>();

  const { data: bookData, isFetching } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  // Set form default values when data is available
  useEffect(() => {
    if (bookData?.data) {
      reset(bookData.data);
    }
  }, [bookData, reset]);

  const onSubmit = async (data: TBook) => {
    try {
      const res = await updateBook({ id, updatedBook: data }).unwrap();
      navigate("/admin/all-book"); // Redirect to books list
      console.log(res);
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  if (isFetching) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input type="text" {...register("name")} />
        </div>
        <div>
          <Label>Author</Label>
          <Input type="text" {...register("author")} />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={(value: any) => setValue("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Romance">Romance</SelectItem>
              <SelectItem value="Science Fiction">Science Fiction</SelectItem>
              <SelectItem value="Mystery">Mystery</SelectItem>
              <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
              <SelectItem value="Biography">Biography</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price</Label>
          <Input type="number" {...register("price")} />
        </div>
        <div>
          <Label>Quantity</Label>
          <Input type="number" {...register("quantity")} />
        </div>
        <div>
          <Label>Publication Year</Label>
          <Input type="number" {...register("publicationYear")} />
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" {...register("description")} />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/all-book")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
