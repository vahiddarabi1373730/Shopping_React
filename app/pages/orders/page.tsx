"use client";
import { CustomTable } from "@/app/share/components/table";
import React, { useState } from "react";
import { ColumnType } from "@rc-component/table";
import { FaEye, FaImages } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdOutlineModeEdit } from "react-icons/md";
import { Order } from "@/app/api/models/order";
import { Button } from "antd";
import AddItemToOrder from "@/app/features/add-item-to-order";
import OrderItems from "@/app/share/components/order-items";

export type SelectedModal = "Detail" | "AddProduct" | null;

export default function Orders() {
  const columns: ColumnType<Order>[] = [
    {
      title: "نام سفارش دهنده",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "وضعیت پرداخت",
      dataIndex: "isPay",
      key: "isPay",
      render: (text: string) => {
        return (
          <span className="text-(--red-500)">
            {text ? "پرداخت شده" : "پرداخت نشده"}
          </span>
        );
      },
    },
    {
      title: "عملیات",
      dataIndex: "action",
      key: "action  ",
      render: (text: string, order: Order) => (
        <div className="flex gap-2 text-sm font-semibold text-[var(--gray-800)] cursor-pointer ">
          <FaEye onClick={() => openModal("Detail", order)} />
          <MdOutlineModeEdit onClick={() => openModal("AddProduct", order)} />
        </div>
      ),
    },
  ];

  const [selectedModal, setSelectedModal] = useState<SelectedModal>(null);

  const [showAddOrder, setShowAddOrder] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);

  const handelShowAddOrder = (items: Order[]) => {
    setShowAddOrder(items?.length === 0);
  };

  const openModal = (
    selectedModal: SelectedModal,
    order: Order | null,
  ): void => {
    setSelectedRow(order);
    setSelectedModal(selectedModal);
  };

  const router = useRouter();

  const closeModal = () => {
    setSelectedModal(null);
    router.refresh();
  };

  return (
    <div>
      {selectedModal === "AddProduct" && (
        <AddItemToOrder open={true} closeModal={closeModal} />
      )}
      {selectedModal === "Detail" && (
        <OrderItems
          open={true}
          closeModal={closeModal}
          orderId={selectedRow!.id}
          isPay={selectedRow!.isPay}
          fullName={selectedRow!.fullName}
          createDate={selectedRow!.createDate}
          paymentDate={selectedRow!.paymentDate}
        />
      )}

      <CustomTable
        url="Order/GetOrders"
        columns={columns}
        handelShowAddOrder={handelShowAddOrder}
        children={
          showAddOrder && (
            <Button
              className="btn-lg"
              color="primary"
              variant="outlined"
              icon={<FaImages />}
              onClick={() => openModal("AddProduct", null)}
            >
              <span className="text-xs font-semibold">افزودن محصول</span>
            </Button>
          )
        }
      />
    </div>
  );
}
