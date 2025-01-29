import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../mainlayout/mainlayout";
import Home from "../pages/Home/Home/Home";
import Login, { LoginForm } from "../components/LoginForm/Login";
import AuthPage from "../components/AuthPage/AuthForm";
import AuthForm from "../components/AuthPage/AuthForm";
import Register from "../components/RegisterForm/RegisterForm";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
