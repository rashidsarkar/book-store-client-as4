import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TBook } from "../../types/book.type";
import {
  FaUserEdit,
  FaCalendarAlt,
  FaTags,
  FaInfoCircle,
} from "react-icons/fa";

export default function SingleProduct() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book: TBook = state?.book;
  const navigation = useNavigate();

  if (!book) {
    return (
      <div className="container p-6 mx-auto text-center">
        <h2 className="text-2xl font-semibold">Book not found</h2>
        <Button
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#577BC1] hover:bg-[#344CB7]"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container p-6 mx-auto">
        <Button
          onClick={() => navigate(-1)}
          className="mb-6 bg-[#577BC1] hover:bg-[#344CB7] text-white"
        >
          ← Back to Bookshelf
        </Button>

        <div className="max-w-6xl p-8 mx-auto bg-white shadow-xl rounded-2xl dark:bg-gray-800">
          {/* Book Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {book.name}
            </h1>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <FaUserEdit className="mr-2 text-[#344CB7]" />
                {book.author}
              </span>
              <span className="text-gray-400">|</span>
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <FaCalendarAlt className="mr-2 text-[#344CB7]" />
                Published: {book.publicationYear}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Book Cover */}
            <div className="relative group">
              <img
                src={book.image}
                alt={book.name}
                className="object-cover w-full h-full transition duration-500 transform shadow-lg rounded-xl group-hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Price and Stock Status */}
              <div className="p-6 bg-gradient-to-r from-[#344CB7] to-[#577BC1] rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">${book.price}</h3>
                    <p
                      className={`mt-2 ${
                        book.quantity > 0 ? "text-green-200" : "text-red-200"
                      }`}
                    >
                      {book.quantity > 0
                        ? `${book.quantity} copies available`
                        : "Currently out of stock"}
                    </p>
                  </div>
                  <span className="px-4 py-2 text-sm font-medium bg-white rounded-full bg-opacity-20">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Book Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                  <h4 className="flex items-center mb-2 font-semibold text-gray-600 dark:text-gray-300">
                    <FaTags className="mr-2 text-[#344CB7]" />
                    Category
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {book.category}
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                  <h4 className="flex items-center mb-2 font-semibold text-gray-600 dark:text-gray-300">
                    <FaCalendarAlt className="mr-2 text-[#344CB7]" />
                    Publication Year
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {book.publicationYear}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  <FaInfoCircle className="mr-2 text-[#344CB7]" />
                  Book Description
                </h3>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  {book.description ||
                    "This book doesn't have a description yet. Check back later!"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-8 text-center">
            <Button
              className="px-8 py-4 text-lg bg-[#577BC1] hover:bg-[#344CB7] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => {
                navigate("/checkOut", { state: book });
              }}
              disabled={book.quantity <= 0}
            >
              {book.quantity > 0 ? "Purchase Now" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
