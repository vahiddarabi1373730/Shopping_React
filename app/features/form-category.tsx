import { Button, Input } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { useLoadCategoriesMutation } from "@/app/api/services/category";

export interface FooterCategoryProps {
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
}

export interface FormCategoryProps {
  onSubmit: (fn: () => void) => void;
  onLoadingChange: (loading: boolean) => void;
}

export const FormCategory = ({
  onSubmit,
  onLoadingChange,
}: FormCategoryProps) => {
  const { register, control, setError, handleSubmit, getValues, reset } =
    useForm();

  const [customError, setCustomError] = useState<any>(null);
  const [caller, { isLoading, isError, data, error }] =
    useLoadCategoriesMutation();
  const submit = async () => {
    setCustomError(null);
    const request = {
      title: getValues().title,
      urlTitle: getValues().urlTitle,
    };
    try {
      await caller(request).unwrap();
      reset();
    } catch (err) {
      setCustomError(err);
    }
  };

  useEffect(() => {
    onSubmit(submit);
  }, []);

  useEffect(() => {
    onLoadingChange(isLoading);
  }, [isLoading]);

  return (
    <div>
      {customError && (
        <span className="block mb-2 border border-solid border-red-200 p-2 rounded-md text-sm font-medium text-[var(--red-500)]">
          {customError.message}
        </span>
      )}

      <form onSubmit={handleSubmit(submit)}>
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col gap-1"}>
            <span className="text-sm font-medium text-(--gray-700)">عنوان</span>
            <Controller
              {...register("title")}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return <Input value={value} onChange={onChange} />;
              }}
              name={"title"}
            />
          </div>
          <div className={"flex flex-col gap-1"}>
            <span className="text-sm font-medium text-(--gray-700)">آدرس</span>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return <Input value={value} onChange={onChange} />;
              }}
              name={"urlTitle"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export const FooterCategory = ({
  onSubmit,
  onCancel,
  loading,
}: FooterCategoryProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        color="primary"
        variant="solid"
        onClick={onSubmit}
        className="btn-md flex items-center justify-center"
        icon={<IoIosAddCircle size="16" />}
        loading={loading}
      >
        <span className="text-base font-semibold">تایدد</span>
      </Button>

      <Button
        onClick={() => onCancel()}
        color="primary"
        variant="outlined"
        className="btn-md flex items-center justify-center"
        icon={<MdCancel size="16" />}
        disabled={loading}
      >
        <span className="text-base font-semibold">انصراف</span>
      </Button>
    </div>
  );
};
