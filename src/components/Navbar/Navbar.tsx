import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSetting,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button"; // Ensure the path is correct
import { selectCurrentUser, logOut } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Menu, Dropdown } from "antd";
import { userRole } from "../../layout/Sidebar";
import "./navbar.css";

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
      dispatch(logOut()); // Log out the user
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Books", path: "/books" },
    { id: 4, text: "About", path: "/about" },
  ];

  const handleDashboard = () => {
    if (data?.role === userRole.ADMIN) {
      navigate("/admin/profile"); // Admin profile route
    } else if (data?.role === userRole.USER) {
      navigate("/user/profile"); // User profile route
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleDashboard}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" onClick={handleAuth}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between h-24 px-4 mx-auto text-white bg-[#000957]">
      <img
        className="w-[150px] h-auto"
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

      {/* Authentication / Dashboard Button */}
      <div className="flex items-center space-x-4">
        {!data?.email ? (
          <Button
            onClick={handleAuth}
            className="bg-[#577BC1] text-white hover:bg-[#344CB7]"
          >
            Login
          </Button>
        ) : (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="flex items-center gap-2 px-4 py-2 text-white bg-[#577BC1] hover:bg-[#344CB7]">
              <AiOutlineSetting size={20} /> Settings
            </Button>
          </Dropdown>
        )}
      </div>

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
        className={`${
          nav
            ? "fixed z-20 md:hidden left-0 top-0 w-[60%] h-full border-r border-r-[#344CB7] bg-[#000957] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500   fixed top-0 bottom-0 left-[-100%]"
        }`}
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
