import React, { useState } from "react";
import BookFilter from "../../components/BookFilter/BookFilter";
import { useGetBooksQuery } from "../../redux/features/admin/adminApi";

type FilterState = {
  filter?: string | null;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | "";
};

export default function AllProduct() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    filter: "",
    sortOrder: "",
    sortBy: "",
  });
  //   console.log(filters);
  const filterData = {
    ...filters,
    search: filters.search?.trim(),
  };
  console.log(filterData);
  const { data: books } = useGetBooksQuery(filters);
  console.log(books);

  return (
    <div className="container p-6 mx-auto">
      {/* Filter UI */}
      <BookFilter onFilter={(data) => setFilters(data)} />

      {/* Books Grid - You can use filters state to fetch books */}
      <div className="text-center text-gray-500">
        Books will be displayed here...
      </div>
    </div>
  );
}
