"use client";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { ImUsers } from "react-icons/im";

export interface MenuItemInterface {
  path: string;
  icon: string;
  label: string;
  id: any;
  children?: MenuItemInterface[];
}

export default function CustomMenu() {
  const router = useRouter();

  const [defaultSelected, setSelected] = useState<string[]>();

  const items = [
    {
      key: "0",
      label: "مدیریت کاربران",
      icon: <FaRegUserCircle />,
      children: [
        {
          key: "users",
          label: "کاربران",
          icon: <ImUsers />,
          path: "users",
        },
        {
          key: "addUser",
          label: "افزودن کاربر",
          icon: <GoDotFill />,
          path: "add-user",
        },
      ],
    },
    {
      key: "1",
      label: "محصولات",
      icon: <MdProductionQuantityLimits size={24} />,
      children: [
        {
          key: "products",
          label: "موبایل",
          icon: <GoDotFill />,
          path: "products",
        },
      ],
    },
    {
      key: "categories",
      label: "دسته‌بندی",
      icon: <TbCategory size={24} />,
      path: "categories",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        components: {
          Menu: {
            itemColor: "var(--brown-700)",
            fontSize: "var(--text-base)" as any,
          },
        },
      }}
    >
      <Menu
        onClick={(e) => onClick(e)}
        style={{ width: 256 }}
        defaultSelectedKeys={defaultSelected}
        defaultOpenKeys={defaultSelected}
        mode="inline"
        items={items}
        className="rounded-2xl
         [&_.ant-menu-submenu-title]:flex [&_.ant-menu-submenu-title]:items-center [&_.ant-menu-submenu-title]:gap-1
         [&_.ant-menu-item]:flex [&_.ant-menu-item]:items-center [&_.ant-menu-item]:gap-1"
      />
    </ConfigProvider>
  );
}
