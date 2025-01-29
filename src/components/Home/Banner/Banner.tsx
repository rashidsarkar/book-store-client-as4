import { FaArrowRight } from "react-icons/fa";
import React from "react";

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
            Discover Your Next{" "}
            <span className="text-primary-600">Adventure</span>
          </h1>
          <h2 className="max-w-2xl mb-6 text-3xl font-bold leading-tight text-gray-700 sm:text-4xl md:text-5xl dark:text-gray-300">
            Explore Worlds Beyond Imagination
          </h2>
          <p className="max-w-2xl mb-8 text-lg font-medium text-gray-600 lg:mb-12 md:text-xl lg:text-2xl dark:text-gray-400">
            Dive into a vast collection of books, from epic fantasy sagas to
            gripping mysteries and heartwarming tales. Find your next favorite
            read and let your imagination soar.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#000957] transition duration-300 rounded-lg bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:ring-primary-300 dark:hover:ring-primary-900"
            >
              Browse Books
              <FaArrowRight className="w-6 h-6 ml-2 -mr-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition duration-300 border-2 rounded-lg text-primary-600 border-primary-600 hover:bg-primary-50 hover:ring-4 hover:ring-primary-100 dark:hover:text-white dark:hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:ring-gray-800"
            >
              Explore Collections
            </a>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:items-center lg:justify-end">
          <img
            src="https://i.ibb.co.com/F48rHyZf/banner-Book.png"
            alt="Bookstore Banner"
            className="w-full max-w-md rounded-lg "
          />
        </div>
      </div>
    </section>
  );
}
