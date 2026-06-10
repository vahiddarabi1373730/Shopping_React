"use client";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { Button, Card, Input } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { useLoginMutation } from "@/app/api/services/login";
import { LoginRequest } from "@/app/api/models/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { register, control, setError, handleSubmit, getValues, reset } =
    useForm();
  const [caller, { isError, isLoading, data, isSuccess }] = useLoginMutation();

  const onSubmit = async () => {
    const request: LoginRequest = {
      email: getValues().email,
      password: getValues().password,
    };
    const response = await caller(request);
    if (!isLoading) {
      localStorage.setItem("shopping_token", response!.data!.data.token);
      localStorage.setItem(
        "shopping_token_expire",
        response!.data!.data.expireTime,
      );
      router.push("/users");
    }
  };
  return (
    <div>
      <Card title="اطلاعات ورود" variant="outlined">
        <form className="flex gap-2" style={{ alignItems: "end" }}>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-(--gray-700)">ایمیل</span>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => {
                return <Input onChange={onChange} value={value} />;
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-(--gray-700)">
              پسوورد
            </span>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => {
                return <Input onChange={onChange} value={value} />;
              }}
            />
          </div>
          <Button
            color="primary"
            variant="solid"
            onClick={onSubmit}
            className="btn-md flex items-center justify-center"
            icon={<IoIosAddCircle size="16" />}
            loading={isLoading}
          >
            <span className="text-base font-semibold">ثبت نام</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
