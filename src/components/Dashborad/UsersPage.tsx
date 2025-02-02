import React, { useState } from "react";
import { Table, Button, Tag, Space, ConfigProvider } from "antd";
import { BlockOutlined, UnlockOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface User {
  key: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export default function UsersPage() {
  const users = [
    { key: "1", name: "John Doe", email: "john@example.com", isBlocked: false },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      isBlocked: true,
    },
    {
      key: "3",
      name: "Alice Brown",
      email: "alice@example.com",
      isBlocked: false,
    },
  ];

  const toggleBlockStatus = (key: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === key ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) =>
        isBlocked ? (
          <Tag color="error" className="font-medium">
            Blocked
          </Tag>
        ) : (
          <Tag color="success" className="font-medium">
            Active
          </Tag>
        ),
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Button
          type={record.isBlocked ? "primary" : "default"}
          danger={!record.isBlocked}
          onClick={() => toggleBlockStatus(record.key)}
          icon={record.isBlocked ? <UnlockOutlined /> : <BlockOutlined />}
          className="flex items-center gap-1"
        >
          {record.isBlocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#1F4976",
            headerColor: "#ffffff",
            headerBorderRadius: 8,
          },
        },
      }}
    >
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Users List
        </h2>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          className="overflow-hidden rounded-lg"
          rowClassName={(record) =>
            record.isBlocked ? "bg-gray-50 hover:bg-gray-100" : ""
          }
        />
      </div>
    </ConfigProvider>
  );
}
