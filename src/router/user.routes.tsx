import ProfilePage from "../components/Dashborad/ProfilePage";
import AllOrderFromUser from "../pages/dashboard/user/AllOrderFromUser";
import ProfileSettings from "../pages/dashboard/user/ProfileSettings";

export const userPath = [
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
    name: "Order",
    children: [
      {
        name: "All Orders",
        path: "all-orders",
        element: <AllOrderFromUser />,
      },
    ],
  },
];
