import React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LoginRequest } from "@/app/api/models/login";
import { Button, Input } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { useLoginMutation } from "@/app/api/services/account";
import setItemLocalStorage from "@/app/share/helpers/set-item-local-storage";

export interface LoginProps {
  handleLogin: (isLogin: boolean) => void;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export default function Login({ handleLogin }: LoginProps) {
  const router = useRouter();
  const { register, control, setError, handleSubmit, getValues, reset } =
    useForm<LoginInterface>();
  const [caller, { isError, isLoading, data, isSuccess }] = useLoginMutation();
  const onSubmit = async () => {
    const request: LoginRequest = {
      email: getValues().email,
      password: getValues().password,
    };
    try {
      const response = await caller(request);
      setItemLocalStorage(
        response.data.data.token,
        response.data.data.expireTime,
      );
      handleLogin(true);
      router.push("/users");
    } catch (error) {
      handleLogin(false);
    }
  };

  return (
    <form className="flex flex-col gap-3 z-[10] w-[50%]">
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
      <Button
        color="primary"
        variant="solid"
        onClick={onSubmit}
        icon={<IoIosAddCircle size="16" />}
        loading={isLoading}
      >
        <span className="text-base font-semibold">ورود</span>
      </Button>
    </form>
  );
}
