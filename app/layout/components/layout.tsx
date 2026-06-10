"use client";
import Menu from "@/app/layout/components/menu";
import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  return (
    <div className="flex gap-2 h-full p-4">
      {isOpenMenu && <Menu></Menu>}

      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <IoMenuOutline
                size={24}
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="cursor-pointer"
              />
            </div>
            <span className="!text-lg font-semibold text-[var(--gray-700)]">
              پروژه فروشگاهی
            </span>
            <MdLogout size={24} />
          </div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
