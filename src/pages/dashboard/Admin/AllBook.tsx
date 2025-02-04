import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetBooksQuery } from "../../../redux/features/admin/adminApi";
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
import { useNavigate } from "react-router-dom";

export default function AllBook() {
  const navigate = useNavigate();
  const filter = {
    search: "",
    filter: "",
    sortOrder: "",
    sortBy: "",
  };

  const { data: books, isFetching } = useGetBooksQuery(filter);
  console.log(books);
  if (isFetching) {
    return <div className="py-4 text-center">Loading...</div>;
  }

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
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>${book.price}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <FaEdit className="mr-1" /> Update
                </Button>
                <Button variant="destructive">
                  <FaTrash className="mr-1" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
