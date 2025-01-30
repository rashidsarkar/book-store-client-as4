import { Layout, Menu } from "antd";
import { useAppSelector } from "../redux/hooks";
import { logOut, selectCurrentUser } from "../redux/features/auth/authSlice";
import { adminPaths } from "../router/admin.routes";
import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const { Sider } = Layout;
export const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  let sidebarItems;
  const role = userRole.ADMIN;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    default:
      break;
  }

  // Handle Logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    dispatch(logOut());
    toast.info("You have been logged out");
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        background: "linear-gradient(180deg, #000957 0%, #344CB7 100%)", // Gradient background
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)", // Sidebar shadow
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
        }}
      >
        <img
          className="w-[140px] h-auto"
          src="https://i.ibb.co.com/hJMQGCzz/logo.png"
          alt="logo"
        />
      </div>

      {/* Sidebar Menu */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
        style={{
          background: "transparent", // Transparent background
          color: "white",
          fontSize: "1rem",
          fontWeight: "500",
          marginTop: "1rem",
        }}
      />

      {/* Logout Section */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          padding: "1rem",
          background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
        }}
        onClick={handleLogout}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 235, 0, 0.8)"; // Hover effect
          e.currentTarget.style.color = "#000957"; // Text contrast
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.color = "white";
        }}
      >
        <LogoutOutlined
          style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}
        />
        <span style={{ fontSize: "1rem", fontWeight: "600" }}>Logout</span>
      </div>
    </Sider>
  );
}
