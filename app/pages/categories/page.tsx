"use client";

import { CustomTable } from "@/app/share/components/table";
import { ColumnType } from "@rc-component/table";
import { Category } from "@/app/api/models/Category";
import { Button, Modal } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { FormCategory, FooterCategory } from "@/app/features/form-category";
import React from "react";
import { useRouter } from "next/navigation";

export default function Categories() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const urlTitleHandleClick = (url: string) => {
    window.open(url, "_blank");
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
      render: (text: string) => <a>{text}</a>,
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
        <div className="flex gap-2 text-sm font-semibold text-[var(--gray-800)] ">
          <a onClick={() => showDetail(record.id)}>جزيیات</a>
        </div>
      ),
    },
  ];

  const showDetail = (id: string) => {
    router.push(`/pages/categories/${id}`);
  };
  const openAddCategoryModal = () => {
    setOpen(true);
  };

  let formSubmit = React.useRef<() => void>(() => {});

  const submitFooter = () => {
    formSubmit.current();
  };
  const registerSubmit = (register: () => void) => {
    formSubmit.current = register;
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
            onCancel={() => setOpen(false)}
            loading={loading}
          />
        )}
        open={open}
        onCancel={() => setOpen(false)}
        height={"300px"}
        className="[&_.ant-modal-container]:!h-full"
      >
        <FormCategory onSubmit={registerSubmit} onLoadingChange={setLoading} />
      </Modal>

      <div className="flex justify-end">
        <Button
          onClick={() => openAddCategoryModal()}
          type="primary"
          className="btn-md flex items-center justify-center"
          icon={<IoIosAddCircle size="16" />}
        >
          <span className="text-base font-semibold">افزودن</span>
        </Button>
      </div>

      <CustomTable
        url="ProductCategory/GetAllProductCategory"
        columns={columns}
      />
    </div>
  );
}
