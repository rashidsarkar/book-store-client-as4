import React from "react";
import { Link } from "react-router-dom";
import { TBook } from "../../../types/book.type";

export default function FeatureCard({ book }: { book: TBook }) {
  const { _id, image, name, price, author, category, quantity } = book;

  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.02]">
      <div className="relative w-full h-56">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 object-cover w-full h-full rounded-t-xl"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <span className="px-3 py-1 mt-2 md:mt-0 text-sm font-medium text-white bg-[#344CB7] rounded-full">
            {category}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          by <span className="font-medium">{author}</span>
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-primary-600 dark:text-primary-500">
            ${price}
          </p>
          <p
            className={`text-sm font-medium ${
              quantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Link
            to={`/books/${_id}`}
            state={{ book }}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#577BC1] hover:bg-[#344CB7] rounded-lg transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
