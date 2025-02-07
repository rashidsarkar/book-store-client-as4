import ProfilePage from "../components/Dashborad/ProfilePage";
import UsersPage from "../components/Dashborad/UsersPage";
import AllBook from "../pages/dashboard/Admin/AllBook";
import AllOrderFromAdmin from "../pages/dashboard/Admin/AllOrderFromAdmin";
import CreateBook from "../pages/dashboard/Admin/CreateBook";
import ProfileSettings from "../pages/dashboard/user/ProfileSettings";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <ProfilePage />,
  },
  {
    name: "Profile Settings",
    path: "profile-settings",
    element: <ProfileSettings />,
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
        name: "All Book",
        path: "all-book",
        element: <AllBook />,
      },
      {
        name: "Create Book",
        path: "create-book",
        element: <CreateBook />,
      },
      {
        name: "Orders",
        path: "orders",
        element: <AllOrderFromAdmin />,
      },
    ],
  },
];
