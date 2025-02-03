import React, { useState } from "react";
import BookFilter from "../../components/BookFilter/BookFilter";

export default function AllProduct() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortOrder: "",
  });
  console.log(filters);

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
