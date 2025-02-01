import ProfilePage from "../components/Dashborad/ProfilePage";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import CreateBook from "../pages/dashboard/Admin/CreateBook";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <ProfilePage />,
  },
  {
    name: "Cerate Book",
    children: [
      {
        name: "Create A. Book",
        path: "create-book",
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
