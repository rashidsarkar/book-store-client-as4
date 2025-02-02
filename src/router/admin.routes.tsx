import ProfilePage from "../components/Dashborad/ProfilePage";
import UsersPage from "../components/Dashborad/UsersPage";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import CreateBook from "../pages/dashboard/Admin/CreateBook";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <ProfilePage />,
  },
  {
    name: "Users",
    path: "users",
    element: <UsersPage />,
  },
  {
    name: "Products ",
    children: [
      {
        name: "All Products",
        path: "all-Products",
        element: <CreateBook />,
      },
      {
        name: "Create Products",
        path: "create-products",
        element: <CreateBook />,
      },
      {
        name: "Create A. Book1",
        path: "create-book1",
        element: <CreateBook />,
      },
      {
        name: "Create A. Book2",
        path: "create-book2",
        element: <CreateBook />,
      },
    ],
  },
];
