import { Layout, Menu } from "antd";
import { useAppSelector } from "../redux/hooks";
import { logOut, TUser } from "../redux/features/auth/authSlice";
import { adminPaths } from "../router/admin.routes";
import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { userPath } from "../router/user.routes";
import { verifyToken } from "../utils/verifyToken";

const { Sider } = Layout;
export const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export default function Sidebar() {
  const dispatch = useDispatch();
  // const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // console.log(user);
  const token = useAppSelector((state) => state.auth.token);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  let sidebarItems;
  const role = user?.role;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPath, userRole.USER);

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
      onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        background: "linear-gradient(180deg, #000957 0%, #344CB7 100%)",
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
          background: "transparent",
          color: "white",
          fontSize: "1rem",
          fontWeight: "500",
          marginTop: "1rem",
        }}
      />

      {/* Logout Section (Hidden when collapsed) */}
      {!collapsed && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 235, 0, 0.8)";
            e.currentTarget.style.color = "#000957";
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
      )}
    </Sider>
  );
}
