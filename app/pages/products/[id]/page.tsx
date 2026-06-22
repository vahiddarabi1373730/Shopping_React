"use client";
import { Card, Spin } from "antd";
import { ValueLabel } from "@/app/share/components/value-label";
import { use } from "react";
import { useLoadProductQuery } from "@/app/api/services/product";
import { miladiToShamsi } from "@/app/share/helpers/miladi-to-shamsi";
import { BASE_URL_Root } from "@/app/api/config";
import { TrueFalse } from "@/app/share/components/true-false";

export interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}
export default function CategoryDetailPage({ params }: ProductDetailsProps) {
  const resultParams = use(params);
  const { data, isLoading } = useLoadProductQuery({
    id: resultParams.id,
  });

  if (isLoading)
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  return (
    <Card
      title="جزییات محصول"
      variant="outlined"
      className="
      [&_.ant-card-body]:flex
      [&_.ant-card-body]:flex-col
      [&_.ant-card-body]:gap-4
      "
    >
      <ValueLabel
        value={miladiToShamsi(data!.data.createDate)}
        label="تاریخ ایجاد"
      ></ValueLabel>
      <ValueLabel value={data!.data.productName} label="نام محصول"></ValueLabel>
      <ValueLabel value={data!.data.price} label="قیمت"></ValueLabel>
      <ValueLabel label="تصویر اصلی">
        <img
          width="36 px"
          height="36px"
          src={BASE_URL_Root + data!.data.imageName}
        />
      </ValueLabel>

      <ValueLabel
        value={data!.data.shortDescription}
        label="توضیحات کوتاه"
      ></ValueLabel>
      <ValueLabel value={data!.data.description} label="توضیحات "></ValueLabel>
      <TrueFalse value={data!.data.isSpecial} label="ویژه"></TrueFalse>
      <TrueFalse value={data!.data.images} label="موجودی"></TrueFalse>
      <ValueLabel label="تصاویر">
        <div className="flex gap-2">
          {data!.data.images.map((image) => (
            <img
              key={image.imageName}
              width="36px"
              height="36px"
              src={BASE_URL_Root + image.imageName}
              alt=""
            />
          ))}
        </div>
      </ValueLabel>
    </Card>
  );
}
