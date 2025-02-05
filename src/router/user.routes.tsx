import ProfilePage from "../components/Dashborad/ProfilePage";
import AllOrders from "../pages/dashboard/user/AllOrders";

export const userPath = [
  {
    name: "Profile",
    path: "profile",
    element: <ProfilePage />,
  },
  {
    name: "Order",
    children: [
      {
        name: "All Orders",
        path: "all-orders",
        element: <AllOrders />,
      },
    ],
  },
];
