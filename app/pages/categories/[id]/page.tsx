"use client";
import { Card, Spin } from "antd";
import { ValueLabel } from "@/app/share/components/value-label";
import { useLoadCategoryQuery } from "@/app/api/services/category";
import { use } from "react";

export interface CategoryDetailsProps {
  params: Promise<{ id: string }>;
}
export default function CategoryDetailPage({ params }: CategoryDetailsProps) {
  const resultParams = use(params);
  const { data, isLoading, isError } = useLoadCategoryQuery({
    id: resultParams.id,
  });

  if (isLoading)
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  return (
    <Card title="جزییات دسته بندی" variant="outlined">
      <ValueLabel value={data!.data.title} label="عنوان"></ValueLabel>
      <ValueLabel value={data!.data.urlTitle} label="آدرس"></ValueLabel>
      <ValueLabel
        value={data!.data.createDate}
        label="تاریخ ایجاد"
      ></ValueLabel>
    </Card>
  );
}
