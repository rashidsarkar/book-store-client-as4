import { Button, Layout } from "antd";
import Sidebar from "../../../layout/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Layout
      className=""
      style={{
        height: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        {/* Header with Custom Colors */}
        <Header
          className="flex items-center px-6"
          style={{
            background: "#344CB7",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <Button
            onClick={() => navigate("/")}
            className="border-none"
            style={{
              background: "#FFEB00",
              color: "#000957",
            }}
          >
            Home
          </Button>
        </Header>

        {/* Content Section */}
        <Content className="p-6  bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800  min-h-[360px] ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
