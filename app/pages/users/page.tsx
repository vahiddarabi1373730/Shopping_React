"use client";
import { CustomTable } from "@/app/share/components/table";
import React from "react";
import { ColumnType } from "@rc-component/table";
import { UserInterface } from "@/app/api/models/User";

export function UserList() {
  const columns: ColumnType<UserInterface>[] = [
    {
      title: "نام و نام خوانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record) => {
        return (
          <span className="text-(--red-500)">
            {record.firstName + record.lastName}
          </span>
        );
      },
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "address",
      render: (text: string, record) => {
        return <span className="text-(--gray-700)">{text}</span>;
      },
    },
  ];
  return (
    <div className="flex flex-col">
      <CustomTable url="User/GetAll" columns={columns} />
    </div>
  );
}
