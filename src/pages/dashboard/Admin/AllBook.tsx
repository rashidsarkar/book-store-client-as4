/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import {
  useDetedBookByIdMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../../../redux/features/admin/adminApi";
import { ImCancelCircle } from "react-icons/im";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { TBook } from "../../../types/book.type";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

enum BookCategory {
  Romance = "Romance",
  ScienceFiction = "Science Fiction",
  Mystery = "Mystery",
  NonFiction = "Non-Fiction",
  Biography = "Biography",
}

export default function AllBook() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<TBook>>({});

  const filter = { search: "", filter: "", sortOrder: "", sortBy: "" };
  const { data: books, isFetching } = useGetBooksQuery(filter);
  const [updateBook] = useUpdateBookMutation();
  const [deletdBook] = useDetedBookByIdMutation();

  const handleEdit = (book: TBook) => {
    setEditingId(book._id!);
    setEditedData({ ...book });
  };

  const handleSave = async () => {
    if (!editingId) return;

    const toastID = toast.loading("Updating book...");
    try {
      // Ensure `id` is included in the update request
      const updatedBookData = { ...editedData, id: editingId };

      const res = await updateBook(updatedBookData).unwrap();
      console.log(res);
      toast.success(res.message || "Book updated successfully!!!!", {
        id: toastID,
      });
    } catch (error: any) {
      toast.error( error?.data?.message ||"Failed to update book");
      console.error(error);
    }

    setEditingId(null);
    setEditedData({});
  };
  const handleDeleted = async (id: string) => {
    const toastID = toast.loading("Deleting book...");
    try {
      const res = await deletdBook(id).unwrap(); // Pass only the id, no need to wrap in an object
      toast.success(res.message || "Book deleted successfully!", {
        id: toastID,
      });
    } catch (error:any) {
      toast.error( error?.data?.message ||"Failed to delete book", { id: toastID });
      console.error(error);
    }
  };

  if (isFetching)
    return (
      <div className="py-4 text-center">
        <LoadingSpinner loading={isFetching} />
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-xl font-bold">All Books</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.data?.map((book: TBook) => (
            <TableRow key={book._id}>
              <TableCell>
                <img
                  src={book.image}
                  alt={book.name}
                  className="object-cover w-12 h-12 rounded"
                />
              </TableCell>

              {/* Name Cell */}
              <TableCell>
                {editingId === book._id ? (
                  <Input
                    value={editedData.name || ""}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                ) : (
                  book.name
                )}
              </TableCell>

              {/* Author Cell */}
              <TableCell>
                {editingId === book._id ? (
                  <Input
                    value={editedData.author || ""}
                    onChange={(e) =>
                      setEditedData({ ...editedData, author: e.target.value })
                    }
                  />
                ) : (
                  book.author
                )}
              </TableCell>

              {/* Category Cell */}
              <TableCell>
                {editingId === book._id ? (
                  <Select
                    value={editedData.category || book.category}
                    onValueChange={(value) =>
                      setEditedData({
                        ...editedData,
                        category: value as BookCategory,
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BookCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  book.category
                )}
              </TableCell>

              {/* Price Cell */}
              <TableCell>
                {editingId === book._id ? (
                  <Input
                    type="number"
                    value={editedData.price?.toString() || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        price: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  `$${book.price}`
                )}
              </TableCell>

              {/* Quantity Cell */}
              <TableCell>
                {editingId === book._id ? (
                  <Input
                    type="number"
                    value={editedData.quantity?.toString() || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  book.quantity
                )}
              </TableCell>

              {/* Actions Cell */}
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  className={`${
                    editingId === book._id
                      ? "bg-green-600 text-white hover:bg-[#49AE93] hover:text-[#03070C]"
                      : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                  onClick={() =>
                    editingId === book._id ? handleSave() : handleEdit(book)
                  }
                >
                  {editingId === book._id ? (
                    <FaSave className="mr-1" />
                  ) : (
                    <FaEdit className="mr-1" />
                  )}
                  {editingId === book._id ? "Save" : "Update"}
                </Button>

                {editingId === book._id ? (
                  <Button
                    variant="outline"
                    className="text-white bg-red-600 hover:text-[#2B2C2E] hover:bg-[#DFC9CD]"
                    onClick={() => {
                      setEditingId(null);
                      setEditedData({});
                    }}
                  >
                    <ImCancelCircle className="mr-1" /> Cancel
                  </Button>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <FaTrash className="mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <p className="text-gray-600">
                          This action cannot be undone. This will permanently
                          delete the book.
                        </p>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleted(book._id!)}
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
