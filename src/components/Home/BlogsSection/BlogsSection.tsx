import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";

export default function BlogsSection() {
  const featuredBlogs = [
    {
      title: "10 Must-Read Books of 2024",
      excerpt:
        "Discover our curated list of groundbreaking new releases and hidden gems...",
      category: "Book Recommendations",
      date: "Mar 15, 2024",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      slug: "must-read-2024",
    },
    // Add more featured blogs
  ];

  const recentBlogs = [
    {
      title: "Creating the Perfect Reading Nook",
      excerpt:
        "Transform any space into a cozy reading sanctuary with these simple tips...",
      category: "Reading Tips",
      date: "Mar 12, 2024",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
      slug: "perfect-reading-nook",
    },
    // Add more recent blogs
  ];

  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Featured Blogs */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Featured Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </section>

      {/* Recent Blogs */}
      <section>
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Latest Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/blogs"
          className="inline-block px-8 py-3 text-lg font-semibold text-white transition-colors bg-[#577BC1] rounded-lg hover:bg-[#344CB7]"
        >
          View All Blog Posts
        </Link>
      </div>
    </div>
  );
}
