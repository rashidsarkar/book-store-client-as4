import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";

type FilterValues = {
  search: string;
  category: string | null;
  sortBy: "price" | "quantity" | null;
  sortOrder: "asc" | "desc" | null;
};

export default function BookFilter({
  onFilter,
}: {
  onFilter: (data: FilterValues) => void;
}) {
  const { register, handleSubmit, setValue, watch } = useForm<FilterValues>();
  const sortBy = watch("sortBy"); // Get current sortBy value

  return (
    <form
      onSubmit={handleSubmit(onFilter)}
      className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            {...register("search")}
            placeholder="Search by name or author..."
          />
          <FaSearch className="absolute text-gray-400 right-3 top-3" />
        </div>

        {/* Category Dropdown */}
        <Select onValueChange={(value) => setValue("category", value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Romance">Romance</SelectItem>
            <SelectItem value="Science Fiction">Science Fiction</SelectItem>
            <SelectItem value="Mystery">Mystery</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By Dropdown */}
        <Select
          onValueChange={(value) =>
            setValue("sortBy", value as "price" | "quantity" | null)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="quantity">Quantity</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order Dropdown - Disabled if no SortBy is selected */}
        <Select
          disabled={!sortBy} // Disable if sortBy is not selected
          onValueChange={(value) =>
            setValue("sortOrder", value as "asc" | "desc" | null)
          }
        >
          <SelectTrigger
            className={`${!sortBy ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  );
}
