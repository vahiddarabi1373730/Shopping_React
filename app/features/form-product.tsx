"use client";
import { Button, Input, Radio, Upload } from "antd";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoIosAddCircle } from "react-icons/io";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { Product, ProductArgRequest } from "@/app/api/models/product";
import {
  useCreateProductMutation,
  useEditProductMutation,
} from "@/app/api/services/product";
import { FaCloudUploadAlt } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";

export interface FooterProductProps {
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
  isValid: boolean;
}

export interface FormProductProps {
  onLoadingChange: (loading: boolean) => void;
  closeModal: () => void;
  product: Product | null;
  isEdit: boolean;
  onHandleValidForm: (isValid: boolean) => void;
}

export const FormProduct = forwardRef(
  (
    {
      onLoadingChange,
      product,
      isEdit,
      closeModal,
      onHandleValidForm,
    }: FormProductProps,
    ref: any,
  ) => {
    const {
      control,
      handleSubmit,
      getValues,
      watch,
      formState: { isValid, errors },
    } = useForm<ProductArgRequest>();
    const createDate = watch("createDate");

    const [customError, setCustomError] = useState<any>(null);
    const [caller, { isLoading }] = useCreateProductMutation();
    const [callerEdit, editRTK] = useEditProductMutation();

    useImperativeHandle(ref, () => ({ run: submit }));
    const submit = async () => {
      const values = getValues();
      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("isExists", String(values.isExists));
      formData.append("isSpecial", String(values.isSpecial));
      formData.append("createDate", values.createDate?.toDate()?.toISOString());
      if (values.imageFile && values.imageFile.file) {
        const actualFile =
          values.imageFile.file.originFileObj || values.imageFile.file;
        formData.append("imageFile", actualFile);
      } else if (values.imageFile instanceof File) {
        formData.append("imageFile", values.imageFile);
      }

      onLoadingChange(true);
      setCustomError(null);

      if (isEdit) {
        formData.append("id", product!.id);
      }
      try {
        if (isEdit) {
          await callerEdit(formData).unwrap();
        } else {
          await caller(formData).unwrap();
        }
        closeModal();
        onLoadingChange(isEdit ? editRTK.isLoading : isLoading);
      } catch (err) {
        setCustomError(err);
        onLoadingChange(isEdit ? editRTK.isLoading : isLoading);
      }
    };

    useEffect(() => {
      onHandleValidForm(isValid);
    }, [watch()]);

    useEffect(() => {
      onLoadingChange(isLoading);
    }, [isLoading]);

    return (
      <div>
        {JSON.stringify(customError)}
        {customError && (
          <span className="block mb-2 border border-solid border-red-200 p-2 rounded-md text-sm font-medium text-[var(--red-500)]">
            {customError.message}
          </span>
        )}

        <form onSubmit={handleSubmit(submit)}>
          <div className={"flex flex-col gap-4"}>
            <div className="flex gap-4">
              <div className={"flex flex-col gap-1 w-full"}>
                <span className="text-sm font-medium text-(--gray-700)">
                  نام محصول
                </span>
                <Controller
                  rules={{
                    required: true,
                    validate: (value) =>
                      value !== "vahid" || "مساوی vahid نزار",
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return <Input value={value} onChange={onChange} />;
                  }}
                  defaultValue={isEdit ? product?.productName : undefined}
                  name={"productName"}
                />
              </div>
              <div className={"flex flex-col gap-1 w-full"}>
                <span className="text-sm font-medium text-(--gray-700)">
                  قیمت
                </span>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Input value={value} onChange={onChange} type="number" />
                    );
                  }}
                  defaultValue={isEdit ? product?.price : undefined}
                  name={"price"}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className={"flex flex-col gap-1 w-full"}>
                <span className="text-sm font-medium text-(--gray-700)">
                  توضیحات کوتاه
                </span>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return <Input value={value} onChange={onChange} />;
                  }}
                  defaultValue={isEdit ? product?.shortDescription : undefined}
                  name={"shortDescription"}
                />
              </div>
              <div className={"flex flex-col gap-1 w-full"}>
                <span className="text-sm font-medium text-(--gray-700)">
                  توضیحات
                </span>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return <Input value={value} onChange={onChange} />;
                  }}
                  defaultValue={isEdit ? product?.description : undefined}
                  name={"description"}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Radio.Group
                      className="flex flex-1"
                      value={value}
                      onChange={onChange}
                      options={[
                        { value: true, label: "ویژه" },
                        { value: false, label: "غیر ویژه" },
                      ]}
                    />
                  );
                }}
                defaultValue={isEdit ? product?.isSpecial : undefined}
                name={"isSpecial"}
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Radio.Group
                      className="flex flex-1"
                      value={value}
                      onChange={onChange}
                      options={[
                        { value: true, label: "موجود" },
                        { value: false, label: "نا موجود" },
                      ]}
                    />
                  );
                }}
                defaultValue={isEdit ? product?.isExists : undefined}
                name={"isExists"}
              />
            </div>

            <Controller
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Upload
                    onChange={onChange}
                    className="flex flex-1"
                    beforeUpload={() => false}
                  >
                    <Button>
                      انتخاب عکس
                      <FaCloudUploadAlt />
                    </Button>
                  </Upload>
                );
              }}
              defaultValue={isEdit ? product?.imageName : undefined}
              name={"imageFile"}
            />
            <div className={"flex flex-col gap-1 w-full"}>
              <div className="flex gap-4">
                <span className="text-sm font-medium text-(--gray-700)">
                  تاریخ ایجاد
                </span>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DatePicker
                        calendarPosition="bottom-right"
                        render={<Icon />}
                        onChange={onChange}
                        value={value}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD"
                      />
                    );
                  }}
                  name={"createDate"}
                />
              </div>
              <span className="text-sm font-medium text-(--red-500)">
                {createDate?.toString()}
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  },
);

export const FooterProduct = ({
  onSubmit,
  onCancel,
  loading,
  isValid,
}: FooterProductProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        color="primary"
        variant="solid"
        onClick={onSubmit}
        className="btn-md flex items-center justify-center"
        icon={<IoIosAddCircle size="16" />}
        loading={loading}
        disabled={!isValid}
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
