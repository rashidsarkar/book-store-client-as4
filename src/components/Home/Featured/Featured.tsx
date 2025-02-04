import React from "react";
import Card from "./FeatureCard";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../../../redux/features/admin/adminApi";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import FeatureCard from "./FeatureCard";
import { TBook } from "../../../types/book.type";

export default function Featured() {
  const filter = {
    search: "",
    filter: "",
    sortOrder: "",
    sortBy: "",
  };
  const { data: books, isFetching } = useGetBooksQuery(filter);
  console.log(books);
  const lastSixBooks = books?.data?.slice(-6) || [];
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingSpinner loading={isFetching} />
        {lastSixBooks?.map((book: TBook) => (
          <FeatureCard key={book._id} book={book} />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Link
          to={`/books`}
          className=" inline-block px-6 py-3 text-lg font-semibold text-white bg-[#577BC1] hover:bg-[#344CB7] rounded-lg transition duration-300"
        >
          Vew All
        </Link>
      </div>
    </div>
  );
}
