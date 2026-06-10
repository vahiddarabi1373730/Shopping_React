import React from "react";
import Products from "@/app/pages/products";
import Categories from "@/app/pages/categories/page";
import { UserList } from "@/app/pages/users/page";
import LoginPage from "@/app/pages/login/page";

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
  login: {
    title: "ورود",
    component: <LoginPage />,
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
      <h1 className="text-2xl font-bold">{pageData?.title}</h1>
      <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
        {pageData.component}
      </div>
    </div>
  );
}
