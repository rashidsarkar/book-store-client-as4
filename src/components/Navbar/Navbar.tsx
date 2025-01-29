import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button"; // Ensure the path is correct
import {
  selectCurrentUser,
  logout,
  logOut,
} from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCurrentUser);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleAuth = () => {
    if (data?.email) {
      dispatch(logOut());
    } else {
      navigate("/login");
    }
  };

  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Company", path: "/company" },
    { id: 3, text: "Resources", path: "/resources" },
    { id: 4, text: "About", path: "/about" },
    { id: 5, text: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between h-24 px-4 mx-auto text-white bg-[#000957]">
      {/* <h1 className="text-3xl font-bold text-[#FFEB00]">NARAKIDO</h1> */}
      <img
        className="w-[150px]  h-auto"
        src="https://i.ibb.co.com/hJMQGCzz/logo.png"
        alt="logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden space-x-4 md:flex">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `p-4 rounded-xl cursor-pointer duration-300 hover:bg-[#344CB7] hover:text-white ${
                  isActive ? "bg-[#344CB7] text-white" : ""
                }`
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Login/Logout Button */}
      <Button
        onClick={handleAuth}
        className="bg-[#577BC1] text-white hover:bg-[#344CB7]"
      >
        {data?.email ? "Logout" : "Login"}
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
        <h1 className="w-full text-3xl font-bold text-[#FFEB00] m-4">
          BookStore
        </h1>
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              onClick={() => setNav(false)}
              className={({ isActive }) =>
                `block p-4 border-b rounded-xl hover:bg-[#344CB7] duration-300 hover:text-white cursor-pointer border-[#577BC1] ${
                  isActive ? "bg-[#344CB7] text-white" : ""
                }`
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
