import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

// Ensure the Button component is correctly imported
import { Button } from "../ui/button"; // Make sure this path is correct or define a basic Button component

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home" },
    { id: 2, text: "Company" },
    { id: 3, text: "Resources" },
    { id: 4, text: "About" },
    { id: 5, text: "Contact" },
  ];

  return (
    <div className="flex items-center justify-between h-24 px-4 mx-auto text-white bg-[#000957]">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#FFEB00]">NARAKIDO</h1>

      {/* Desktop Navigation */}
      <ul className="hidden space-x-4 md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#344CB7] rounded-xl cursor-pointer duration-300 hover:text-white"
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <Button className="bg-[#577BC1] text-white hover:bg-[#344CB7]">
        Login
      </Button>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} color="#FFEB00" />
        ) : (
          <AiOutlineMenu size={20} color="#FFEB00" />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-[#344CB7] bg-[#000957] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#FFEB00] m-4">REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#344CB7] duration-300 hover:text-white cursor-pointer border-[#577BC1]"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
