import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../components/LoginForm/Login";
import Register from "../components/RegisterForm/RegisterForm";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import Mainlayout from "../mainlayout/Mainlayout";
import AllProduct from "../pages/AllProduct/AllProduct";
import SingleProduct from "../pages/AllProduct/SingleProduct";
import UpdateBook from "../pages/dashboard/Admin/UpdateBook";
import About from "../pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllProduct />,
      },
      {
        path: "/books/:id",
        element: <SingleProduct />,
      },
      {
        path: "/books/update/:id",
        element: <UpdateBook />,
      },
      {
        path: "/books/:id",
        element: <SingleProduct />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: routeGenerator(adminPaths),
  },
]);
