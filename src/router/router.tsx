import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../components/LoginForm/Login";
import Register from "../components/RegisterForm/RegisterForm";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import Mainlayout from "../mainlayout/Mainlayout";
import AllProduct from "../pages/AllProduct/AllProduct";

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
        path: "/login",
        element: <Login />,
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
