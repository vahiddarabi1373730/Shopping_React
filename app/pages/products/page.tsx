"use client";
import { Button, Modal, Popconfirm } from "antd";
import { CustomTable } from "@/app/share/components/table";
import React, { useRef, useState } from "react";
import { Product } from "@/app/api/models/product";
import { FooterProduct, FormProduct } from "@/app/features/form-product";
import { ColumnType } from "@rc-component/table";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { FaEye, FaImages } from "react-icons/fa";
import { BASE_URL_Root } from "@/app/api/config";
import { miladiToShamsi } from "@/app/share/helpers/miladi-to-shamsi";
import AddImageToProduct from "@/app/features/AddImageToProduct";
import { useRouter } from "next/navigation";
import {
  handelRefetch,
  useDeleteProductMutation,
} from "@/app/api/services/product";

export type SelectedModal = "crud" | "image" | null;
export default function Products() {
  const columns: ColumnType<Product>[] = [
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      render: (text: string) => (
        <span className="text-(--red-500)">{miladiToShamsi(text)}</span>
      ),
    },
    {
      title: "نام محصول",
      dataIndex: "productName",
      key: "productName",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      render: (text: number) => (
        <span className="text-(--red-500)">{text.toLocaleString("fa-IR")}</span>
      ),
    },
    {
      title: "توضیحات کوتاه",
      dataIndex: "shortDescription",
      key: "shortDescription",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "تصویر محصول",
      dataIndex: "imageName",
      key: "imageName",
      render: (text: string) => (
        <img alt={""} width="24px" height="24px" src={BASE_URL_Root + text} />
      ),
    },
    {
      title: "ویژه",
      dataIndex: "isSpecial",
      key: "isSpecial",
      render: (text: string) => {
        return (
          <span className="text-(--red-500)">{text ? "ویژه" : "غیر ویژه"}</span>
        );
      },
    },
    {
      title: "عملیات",
      dataIndex: "action",
      key: "action  ",
      render: (text: string, record: Product) => (
        <div className="flex gap-2 text-sm font-semibold text-[var(--gray-800)] cursor-pointer ">
          <FaEye onClick={() => handelShowDetail(record.id)} />
          <MdOutlineModeEdit onClick={() => EditProduct(record.id, record)} />
          <Popconfirm
            title="حذف محصول"
            description="آیا از حذف محصول مطمين هستین"
            okText="بله"
            cancelText="خیر "
            onConfirm={() => deleteProduct(record.id)}
          >
            <MdDelete color="red" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [caller, response] = useDeleteProductMutation();
  const [selectedModal, setSelectedModal] = useState<SelectedModal>(null);
  const [selectedRow, setSelectedRow] = useState<Product | null>(null);
  const router = useRouter();
  const formRef = useRef<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const EditProduct = (id: number, product: Product) => {
    setSelectedRow(product);
    setIsEdit(true);
    setSelectedModal("crud");
  };
  const deleteProduct = (id: number) => {
    caller(id).unwrap();
  };
  const handelShowDetail = (id: number): void => {
    router.push(`pages/products/${id}`);
  };
  const onHandleValidForm = (isValid: boolean) => {
    setIsValid(isValid);
  };
  const submitFooter = () => {
    formRef.current.run();
  };
  const closeModal = () => {
    setIsEdit(false);
    setSelectedModal(null);
    router.refresh();
    handelRefetch(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <Modal
        destroyOnHidden={true}
        title={
          <div className={"flex flex-col gap-2"}>
            <span className={"text-xl font-bold text-[var(--gray-800)]"}>
              {isEdit ? "ویرایش محصول" : "ایجاد محصول"}
            </span>
            <hr className={"text-[var(--gray-400)]"} />
          </div>
        }
        footer={() => (
          <FooterProduct
            onSubmit={submitFooter}
            onCancel={closeModal}
            loading={loading}
            isValid={isValid}
            isEdit={isEdit}
          />
        )}
        open={selectedModal === "crud"}
        onCancel={closeModal}
        height={"450px"}
        className="[&_.ant-modal-container]:!h-full"
      >
        <FormProduct
          onLoadingChange={setLoading}
          ref={formRef}
          product={selectedRow}
          isEdit={isEdit}
          closeModal={closeModal}
          onHandleValidForm={onHandleValidForm}
        />
      </Modal>

      {selectedModal === "image" && (
        <AddImageToProduct isOpen={true} onClose={closeModal} />
      )}

      <CustomTable
        url="Product/GetFilterProducts"
        columns={columns}
        openModal={() => setSelectedModal("crud")}
        children={
          <Button
            className="btn-md"
            color="primary"
            variant="outlined"
            icon={<FaImages />}
            onClick={() => setSelectedModal("image")}
          >
            <span className="text-xs font-semibold">افزودن عکس</span>
          </Button>
        }
      />
    </div>
  );
}
