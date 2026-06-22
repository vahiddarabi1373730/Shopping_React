import { Card } from "antd";
import { BASE_URL_Root } from "@/app/api/config";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAddItemMutation } from "@/app/api/services/order";
import { BsFillSendCheckFill } from "react-icons/bs";

export interface ProductItemProps {
  productName: string;
  imageName: string;
  productId: number;
}

const { Meta } = Card;

export default function ProductItem({
  productName,
  imageName,
  productId,
}: ProductItemProps) {
  const [count, setCount] = useState(0);
  const [caller, responseQuery] = useAddItemMutation();

  const submit = () => {
    caller({ productId: productId, count });
  };
  return (
    <Card
      style={{ width: 150 }}
      className="order-item"
      cover={
        <img
          draggable={false}
          alt=""
          width="24px !important"
          src={BASE_URL_Root + imageName}
        />
      }
    >
      <Meta title={productName} />
      <div className="flex items-center gap-4 mt-1 cursor-pointer">
        <span className="text-[12px]">{count}</span>
        <FaMinus
          onClick={() => setCount(count - 1 <= 0 ? 0 : count - 1)}
          size="12"
        />
        <FaPlus onClick={() => setCount(count + 1)} size="12" />
        <span title="ارسال">
          <BsFillSendCheckFill onClick={submit} size="12" />
        </span>
      </div>
    </Card>
  );
}
