"use client";

import { CustomTable } from "@/app/share/components/table";
import { ColumnType } from "@rc-component/table";
import { Category } from "@/app/api/models/Category";
import { Button, Modal, Popconfirm } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { FormCategory, FooterCategory } from "@/app/features/form-category";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { useDeleteCategoryMutation } from "@/app/api/services/category";

export default function Categories() {
  const formRef = useRef<any>(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Category | null>(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [caller, response] = useDeleteCategoryMutation();

  const urlTitleHandleClick = (url: string) => {
    window.open(url, "_blank");
  };

  const closeModal = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const columns: ColumnType<Category>[] = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "آدرس",
      dataIndex: "urlTitle",
      key: "urlTitle  ",
      render: (text: string) => (
        <a onClick={() => urlTitleHandleClick(text)}>{text}</a>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "action",
      key: "action  ",
      render: (text: string, record: Category) => (
        <div className="flex gap-2 text-sm font-semibold text-[var(--gray-800)] cursor-pointer ">
          <a onClick={() => showDetail(record.id)}>جزيیات</a>

          <span onClick={() => EditCategory(record.id, record)}>
            <MdOutlineModeEdit />
          </span>
          <span>
            <Popconfirm
              title="حذف دسته بندی"
              description="آیا از حذف دسته بندی مطمين هستین"
              okText="بله"
              cancelText="خیر "
              onConfirm={() => deleteCategory(record.id)}
            >
              <MdDelete color="red" />
            </Popconfirm>
          </span>
        </div>
      ),
    },
  ];

  const showDetail = (id: string) => {
    router.push(`/pages/categories/${id}`);
  };
  const deleteCategory = (id: string) => {
    caller(id).unwrap();
  };
  const EditCategory = (id: string, category: Category) => {
    setSelectedRow(category);
    setIsEdit(true);
    setOpen(true);
  };
  const openAddCategoryModal = () => {
    setOpen(true);
  };

  const submitFooter = () => {
    formRef.current.run();
  };
  return (
    <div className="flex flex-col gap-2">
      <Modal
        destroyOnHidden={true}
        title={
          <div className={"flex flex-col gap-2"}>
            <span className={"text-xl font-bold text-[var(--gray-800)]"}>
              دسته بندی
            </span>
            <hr className={"text-[var(--gray-400)]"} />
          </div>
        }
        footer={() => (
          <FooterCategory
            onSubmit={submitFooter}
            onCancel={closeModal}
            loading={loading}
          />
        )}
        open={open}
        onCancel={closeModal}
        height={"250px"}
        className="[&_.ant-modal-container]:!h-full"
      >
        <FormCategory
          onLoadingChange={setLoading}
          ref={formRef}
          category={selectedRow}
          isEdit={isEdit}
          closeModal={closeModal}
        />
      </Modal>

      <CustomTable
        url="ProductCategory/GetAllProductCategory"
        columns={columns}
        openModal={openAddCategoryModal}
      />
    </div>
  );
}
