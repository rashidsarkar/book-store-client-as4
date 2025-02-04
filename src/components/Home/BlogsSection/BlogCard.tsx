import { Link } from "react-router-dom";

// BlogCard.tsx
interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export function BlogCard({
  title,
  excerpt,
  category,
  date,
  image,
  slug,
}: BlogCardProps) {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-xl dark:bg-gray-800 hover:shadow-2xl group">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute px-3 py-1 text-sm font-medium text-white top-2 left-2 bg-[#344CB7] rounded-full">
          {category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {date}
        </div>

        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
          <Link
            to={`/blogs/${slug}`}
            className="hover:text-[#577BC1] transition-colors"
          >
            {title}
          </Link>
        </h3>

        <p className="mb-4 text-gray-600 dark:text-gray-300">{excerpt}</p>

        <Link
          to={`/blogs/${slug}`}
          className="inline-flex items-center font-medium text-[#344CB7] hover:text-[#577BC1] transition-colors"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
