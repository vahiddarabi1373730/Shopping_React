import { Modal, Spin } from "antd";
import React from "react";
import { useLoadProductsQuery } from "@/app/api/services/product";
import ProductItem from "@/app/share/components/product_item";
import "../scss/add-item-to-order.scss";

export interface AddItemToOrder {
  open: boolean;
  closeModal: () => void;
}
export default function AddItemToOrder({ open, closeModal }: AddItemToOrder) {
  const responseQuery = useLoadProductsQuery();

  return (
    <Modal
      open={open}
      destroyOnHidden={true}
      title={
        <div className={"flex flex-col gap-2"}>
          <span className={"text-xl font-bold text-[var(--gray-800)]"}>
            عکس محصول
          </span>
          <hr className={"text-[var(--gray-400)]"} />
        </div>
      }
      footer={null}
      onCancel={closeModal}
      height={"80%"}
      width={"80%"}
      className="add-item-modal [&_.ant-modal-container]:!h-full"
    >
      {responseQuery.isFetching && <Spin size="large" />}

      {!responseQuery.isFetching &&
        responseQuery.data?.data.map((i) => (
          <ProductItem
            key={i.id}
            imageName={i.imageName}
            productName={i.productName}
            productId={i.id}
          />
        ))}
    </Modal>
  );
}
