import { Button, Input } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import {
  useCreateCategoriesMutation,
  useEditCategoryMutation,
} from "@/app/api/services/category";
import { Category, CategoryArg } from "@/app/api/models/Category";

export interface FooterCategoryProps {
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
}

export interface FormCategoryProps {
  onLoadingChange: (loading: boolean) => void;
  closeModal: () => void;
  category: Category | null;
  isEdit: boolean;
}

export const FormCategory = forwardRef(
  (
    { onLoadingChange, category, isEdit, closeModal }: FormCategoryProps,
    ref: any,
  ) => {
    const { control, setError, handleSubmit, getValues, reset } = useForm();
    const [customError, setCustomError] = useState<any>(null);
    const [caller, { isLoading, isError, data, error }] =
      useCreateCategoriesMutation();
    const [callerEdit, editRTK] = useEditCategoryMutation();

    useImperativeHandle(ref, () => ({ run: submit }));
    const submit = async () => {
      onLoadingChange(true);
      setCustomError(null);
      let arg: CategoryArg = {
        request: {
          title: getValues().title,
          urlTitle: getValues().urlTitle,
        },
      };
      if (isEdit) {
        arg = { ...arg, id: category?.id };
      }
      try {
        if (isEdit) {
          await callerEdit(arg).unwrap();
        } else {
          await caller(arg).unwrap();
        }
        closeModal();
        onLoadingChange(isEdit ? editRTK.isLoading : isLoading);
      } catch (err) {
        setCustomError(err);
        onLoadingChange(isEdit ? editRTK.isLoading : isLoading);
      }
    };

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
              <span className="text-sm font-medium text-(--gray-700)">
                عنوان
              </span>
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return <Input value={value} onChange={onChange} />;
                }}
                defaultValue={isEdit ? category?.title : null}
                name={"title"}
              />
            </div>
            <div className={"flex flex-col gap-1"}>
              <span className="text-sm font-medium text-(--gray-700)">
                آدرس
              </span>
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return <Input value={value} onChange={onChange} />;
                }}
                defaultValue={isEdit ? category?.urlTitle : null}
                name={"urlTitle"}
              />
            </div>
          </div>
        </form>
      </div>
    );
  },
);

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
