import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

export default function Featured() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Card
          imageUrl="https://i.ibb.co.com/F48rHyZf/banner-Book.png"
          title="Epic Fantasy Saga"
          price="$29.99"
          reviewCount={120}
          rating={4.5}
        />
        {/* Card 2 */}
        <Card
          imageUrl="https://i.ibb.co.com/vDWCk6V/Caesar-Salad.jpg"
          title="Mystical Adventures"
          price="$24.99"
          reviewCount={95}
          rating={4}
        />
        {/* Card 3 */}
        <Card
          imageUrl="https://via.placeholder.com/400x300"
          title="Otherworldly Realms"
          price="$19.99"
          reviewCount={80}
          rating={5}
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
