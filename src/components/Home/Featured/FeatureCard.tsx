import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import the star icons
import { Link } from "react-router-dom";
import { TBook } from "../../../types/book.type";

export default function FeatureCard({
  image,
  name,
  price,
  author,
  category,
}: TBook) {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>

        {/* Price */}
        <p className="mb-3 text-xl font-bold text-primary-600 dark:text-primary-500">
          Price : ${price}
        </p>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-[#344CB7] rounded-full">
            {category}
          </span>
        </div>

        {/* View Details Button */}
        <div className="flex justify-end">
          <Link
            to="#"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-[#577BC1] hover:bg-[#344CB7] rounded-lg transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
