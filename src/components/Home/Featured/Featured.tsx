import React from "react";
import Card from "./FeatureCard";
import { Link } from "react-router-dom";

export default function Featured() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Card
          image="https://i.ibb.co.com/vDWCk6V/Caesar-Salad.jpg"
          author="Rongila"
          category="English"
          name="English for Today"
          price="100"
        />
      </div>
      <div className="flex justify-center my-5">
        <Link
          href="#"
          className=" inline-block px-6 py-3 text-lg font-semibold text-white bg-[#577BC1] hover:bg-[#344CB7] rounded-lg transition duration-300"
        >
          Vew All
        </Link>
      </div>
    </div>
  );
}
