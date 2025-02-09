import React from "react";
import BookFilter from "../../components/BookFilter/BookFilter";
import { useGetBooksQuery } from "../../redux/features/admin/adminApi";
import FeatureCard from "../../components/Home/Featured/FeatureCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { TBook } from "../../types/book.type";

type FilterState = {
  filter?: string | null;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | "";
};

export default function AllProduct() {
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    filter: "",
    sortOrder: "",
    sortBy: "",
  });

  const filterData = {
    ...filters,
    search: filters.search?.trim(),
  };

  const { data: books, isLoading: isFetching } = useGetBooksQuery(filterData);

  return (
    <div className="container p-6 mx-auto">
      <BookFilter onFilter={(data) => setFilters(data)} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingSpinner loading={isFetching} />
        {books?.data.map((book: TBook) => (
          <FeatureCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
