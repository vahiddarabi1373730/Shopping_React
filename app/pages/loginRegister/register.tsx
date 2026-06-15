import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { useRegisterMutation } from "@/app/api/services/account";
import setItemLocalStorage from "@/app/share/helpers/set-item-local-storage";
import Error, { ErrorResponse } from "@/app/share/components/Error";
export interface RegisterProps {
  handleLogin: (isLogin: boolean) => void;
}
export interface RegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}
export default function Register({ handleLogin }: RegisterProps) {
  const router = useRouter();
  const { register, control, setError, handleSubmit, getValues, reset } =
    useForm<RegisterInterface>();
  const [caller, { isError, isLoading, data, isSuccess }] =
    useRegisterMutation();
  const [customError, setCustomError] = useState<ErrorResponse | null>(null);

  const onSubmit = async () => {
    const request: RegisterInterface = {
      email: getValues().email,
      password: getValues().password,
      address: getValues().address,
      confirmPassword: getValues().confirmPassword,
      firstName: getValues().firstName,
      lastName: getValues().lastName,
    };
    try {
      const response = await caller(request).unwrap();
      setItemLocalStorage(
        response.data.data.token,
        response.data.data.expireTime,
      );
      handleLogin(true);
      router.push("/users");
    } catch (error: any) {
      handleLogin(false);
      setCustomError(error);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-[50%]">
      {customError && (
        <Error message={customError.message} status={customError.status} />
      )}

      <form className="flex flex-col gap-3 z-[10] w-[100%]">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">نام</span>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !placeholder-white"
                  placeholder="نام"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">
            نام خانوادگی
          </span>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !placeholder-white"
                  placeholder="نام خانوادگی"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">ایمیل</span>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !placeholder-white"
                  placeholder="ایمیل"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">پسوورد</span>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !border-white/40 !placeholder-white"
                  placeholder="رمز عبور"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">
            تکرار کلمه عبور
          </span>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !border-white/40 !placeholder-white"
                  placeholder="تکرار کلمه عبور"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-25)">آدرس</span>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  className="!bg-transparent !text-white !border-white/40 !placeholder-white"
                  placeholder="آدرس"
                />
              );
            }}
          />
        </div>
        <Button
          color="primary"
          variant="solid"
          onClick={onSubmit}
          icon={<IoIosAddCircle size="16" />}
          loading={isLoading}
        >
          <span className="text-base font-semibold">ثبت نام</span>
        </Button>
      </form>
    </div>
  );
}
