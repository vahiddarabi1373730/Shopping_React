import React from "react";
import Products from "@/app/pages/products";
import Categories from "@/app/pages/categories/page";
import { UserList } from "@/app/pages/users/page";
import LoginRegister from "@/app/pages/loginRegister/login-register";
import { Card } from "antd";

const ProductContent = () => <Products />;
const CategoryContent = () => <Categories />;
const Page_Components: Record<
  string,
  { title: string; component: React.ReactNode }
> = {
  products: {
    title: "محصولات",
    component: <ProductContent />,
  },
  categories: {
    title: "دسته بندی ها",
    component: <CategoryContent />,
  },
  users: {
    title: "لیست کاربران",
    component: <UserList />,
  },
};
export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = Page_Components[slug];

  return (
    <div className="flex flex-col gap-2 h-full">
      <Card
        className="h-full flex flex-col"
        title={<span className="text-2xl font-bold">{pageData?.title}</span>}
      >
        {pageData?.component}
      </Card>
    </div>
  );
}
