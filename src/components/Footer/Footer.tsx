import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#000957] text-white py-10">
      <div className="container grid gap-8 px-6 mx-auto md:grid-cols-3">
        {/* Logo & About Section */}
        <div className="space-y-4">
          <img
            src="https://i.ibb.co/hJMQGCzz/logo.png"
            alt="BookStore Logo"
            className="w-24"
          />
          <p className="text-sm text-gray-300">
            Discover your next favorite book at <b>BookStore</b>. We provide a
            wide range of books from various genres, authors, and publishers.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-[#FFEB00]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-[#FFEB00]">
                Browse Books
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#FFEB00]">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={18} /> bookstore@email.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +880 123 456 789
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <Link to="#" className="hover:text-[#FFEB00]">
              <Facebook size={20} />
            </Link>
            <Link to="#" className="hover:text-[#FFEB00]">
              <Instagram size={20} />
            </Link>
            <Link to="#" className="hover:text-[#FFEB00]">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="pt-4 mt-8 text-sm text-center text-gray-400 border-t border-gray-600">
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}
