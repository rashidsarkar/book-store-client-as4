import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import the star icons
import { Link } from "react-router-dom";

interface CardProps {
  imageUrl: string;
  title: string;
  price: string;
  reviewCount: number;
  rating: number;
}

export default function Card({
  imageUrl,
  title,
  price,
  reviewCount,
  rating,
}: CardProps) {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Price */}
        <p className="mb-3 text-xl font-bold text-primary-600 dark:text-primary-500">
          {price}
        </p>

        {/* Reviews Section */}
        <div className="flex items-center">
          {/* Star Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
              if (index < rating) {
                return (
                  <FaStar key={index} className="w-5 h-5 text-yellow-400" />
                );
              } else if (index < rating + 0.5) {
                return (
                  <FaStarHalfAlt
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                  />
                );
              } else {
                return <FaStar key={index} className="w-5 h-5 text-gray-300" />;
              }
            })}
          </div>

          {/* Review Count */}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* View Details Button */}
        <div className="flex justify-end">
          <Link
            href="#"
            className=" inline-block px-6 py-3 text-lg font-semibold text-white bg-[#577BC1] hover:bg-[#344CB7] rounded-lg transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
