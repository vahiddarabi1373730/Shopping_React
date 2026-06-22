import { Divider, Modal, Popconfirm } from "antd";
import React from "react";
import { DeleteItemRequest, OrderItemResponse } from "@/app/api/models/order";
import { CustomTable } from "@/app/share/components/table";
import { ColumnType } from "@rc-component/table";
import { ValueLabel } from "@/app/share/components/value-label";
import { miladiToShamsi } from "@/app/share/helpers/miladi-to-shamsi";
import { TrueFalse } from "@/app/share/components/true-false";
import { MdDelete } from "react-icons/md";
import { useDeleteItemMutation } from "@/app/api/services/order";

export interface OrderItemProps {
  open: boolean;
  closeModal: () => void;
  orderId: number;
  fullName: string;
  isPay: boolean;
  paymentDate: string;
  createDate: string;
}

export default function OrderItems({
  open,
  closeModal,
  orderId,
  fullName,
  isPay,
  paymentDate,
  createDate,
}: OrderItemProps) {
  const [caller, response] = useDeleteItemMutation();
  const deleteItem = (id: number) => {
    caller({ orderId: orderId, orderItemId: id } as DeleteItemRequest).unwrap();
  };
  const columns: ColumnType<OrderItemResponse>[] = [
    {
      title: "تعداد",
      dataIndex: "count",
      key: "count",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
      ),
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      render: (text: string) => (
        <span className="text-(--red-500)">{text}</span>
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
      title: "عملیات",
      dataIndex: "action",
      key: "action  ",
      render: (text: string, record: OrderItemResponse) => (
        <div className="flex gap-2 text-sm font-semibold text-[var(--gray-800)] cursor-pointer ">
          <Popconfirm
            title="حذف محصول"
            description="آیا از حذف محصول مطمين هستین"
            okText="بله"
            cancelText="خیر "
            onConfirm={() => deleteItem(record.id)}
          >
            <MdDelete color="red" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <Modal
      open={open}
      destroyOnHidden={true}
      title={
        <div className={"flex flex-col gap-2"}>
          <span className={"text-xl font-bold text-[var(--gray-800)]"}>
            محصولات موجود در سبد خرید
          </span>
          <hr className={"text-[var(--gray-400)]"} />
        </div>
      }
      footer={null}
      onCancel={closeModal}
      height={"80%"}
      width={"80%"}
      className="[&_.ant-modal-container]:!h-full"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ValueLabel value={orderId} label="شماره سفارش"></ValueLabel>
          <ValueLabel value={fullName} label="نام سفارش دهنده"></ValueLabel>
          <ValueLabel
            value={miladiToShamsi(paymentDate)}
            label="تاریخ پرداخت"
          ></ValueLabel>
          <ValueLabel
            value={miladiToShamsi(createDate)}
            label="تاریخ سفارش"
          ></ValueLabel>
          <TrueFalse value={isPay} label="وضعیت پرداخت"></TrueFalse>
        </div>
        <Divider />
        <CustomTable
          url={`Order/GetOrderItems/${orderId}/`}
          columns={columns}
          hasPagination={false}
        />
      </div>
    </Modal>
  );
}
