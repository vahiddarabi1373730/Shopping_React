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
          key: "0-1",
          label: "کاربران",
          icon: <ImUsers />,
          path: "users",
        },
        {
          key: "0-2",
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
        { key: "1-1", label: "موبایل", icon: <GoDotFill />, path: "products" },
      ],
    },
    {
      key: "2",
      label: "دسته‌بندی",
      icon: <TbCategory size={24} />,
      children: [
        { key: "2-1", label: "ورزشی", icon: <GoDotFill />, path: "categories" },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    items.forEach((item) => {
      const child = item.children.find((ch) => ch.key === e.key);
      if (child) {
        router.push(child.path);
      }
    });
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
