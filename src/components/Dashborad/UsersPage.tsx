import React, { useState } from "react";
import { Table, Button, Tag, Space, ConfigProvider } from "antd";
import { BlockOutlined, UnlockOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import {
  useBlockUserMutation,
  useGetAllUserQuery,
} from "../../redux/features/admin/adminApi";

interface User {
  key: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export default function UsersPage() {
  const { data: allUser, isFetching } = useGetAllUserQuery(undefined);
  const [blockuser] = useBlockUserMutation();

  const users: User = allUser?.data?.map((item) => {
    return {
      key: item._id,
      name: item.name,
      email: item.email,
      isBlocked: item.isBlocked,
    };
  });
  const toggleBlockStatus = async (key: string, isBlocked: boolean) => {
    const userInfo = {
      key,
      setStatusTo: { runningStatus: isBlocked },
    };

    const res = await blockuser(userInfo);
    console.log(res);
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
          onClick={() => toggleBlockStatus(record.key, record.isBlocked)}
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
          loading={isFetching}
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
