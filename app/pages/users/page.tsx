"use client";
import { CustomTable } from "@/app/share/components/table";
import React, { useState } from "react";
import { ColumnType } from "@rc-component/table";
import { UserInterface } from "@/app/api/models/User";
import { Modal } from "antd";
import UserForm, { UserFormFooter } from "@/app/features/user-form";
import { BiEdit } from "react-icons/bi";

export function UserList() {
  const [submitCounter, setSubmitCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserInterface | null>(
    null,
  );
  const openModal = () => {
    setIsOpen(true);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };
  const handIsValidForm = (isValid: boolean) => {
    setIsValid(isValid);
  };

  const closeModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setIsOpen(false);
    setSubmitCounter(0);
  };

  const onSubmit = () => {
    setSubmitCounter(submitCounter + 1);
  };

  const onHangleEditUser = (user: UserInterface) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsOpen(true);
  };

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
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      render: (text: string, record) => {
        return (
          <span className="text-(--gray-700)">
            <BiEdit onClick={() => onHangleEditUser(record)} />
          </span>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Modal
        title={
          <div className={"flex flex-col gap-2"}>
            <span className={"text-xl font-bold text-[var(--gray-800)]"}>
              افزودن کاربر
            </span>
            <hr className={"text-[var(--gray-400)]"} />
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onCancel={closeModal}
        destroyOnHidden={true}
        footer={
          <UserFormFooter
            onCancel={closeModal}
            onSubmit={onSubmit}
            loading={loading}
            isValid={isValid}
          />
        }
      >
        <UserForm
          counter={submitCounter}
          handleLoading={handleLoading}
          isEdit={isEditMode}
          user={selectedUser}
          closeModal={closeModal}
          handIsValidForm={handIsValidForm}
        />
      </Modal>

      <div className="flex flex-col">
        <CustomTable
          url="User/GetAll"
          columns={columns}
          openModal={openModal}
        />
      </div>
    </div>
  );
}
