import { Button, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { ProductImageArg } from "@/app/api/models/product";
import { LabelValue } from "@/app/api/models/label-value";
import {
  handelRefetch,
  useCreateProductGalleryMutation,
  useLoadProductsQuery,
} from "@/app/api/services/product";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export interface AddImageToProductProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddImageToProduct({
  isOpen,
  onClose,
}: AddImageToProductProps) {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<ProductImageArg>();

  const [caller, rtk] = useCreateProductGalleryMutation();
  const [customError, setCustomError] = useState<any>(null);

  const onSubmit = async () => {
    const formData = new FormData();
    getValues().productId &&
      formData.append("productId", getValues().productId);
    formData.append("imageFile", getValues().imageFile);
    setCustomError(null);
    try {
      await caller(formData).unwrap();
      handelRefetch(true);
      onClose();
    } catch (error) {
      setCustomError(error);
    }
  };

  useEffect(() => {
    const subscription = watch(() => setCustomError(null));
    return () => subscription.unsubscribe();
  }, [watch]);
  const [productsOptions, setProductsOptions] = useState<LabelValue[]>([]);

  const { data, isLoading } = useLoadProductsQuery();

  useEffect(() => {
    if (data) {
      setProductsOptions(
        data.data.map((p) => ({ label: p.productName, value: p.id })),
      );
    }
  }, [data]);

  return (
    <Modal
      open={isOpen}
      destroyOnHidden={true}
      title={
        <div className={"flex flex-col gap-2"}>
          <span className={"text-xl font-bold text-[var(--gray-800)]"}>
            عکس محصول
          </span>
          <hr className={"text-[var(--gray-400)]"} />
        </div>
      }
      footer={null}
      onCancel={onClose}
      height={"300px"}
      className=" [&_.ant-modal-container]:!h-full"
    >
      <div>
        {customError && (
          <span className="block mb-2 border border-solid border-red-200 p-2 rounded-md text-sm font-medium text-[var(--red-500)]">
            {customError.message}
          </span>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            rules={{
              required: {
                value: true,
                message: "این فیلد الزامی است",
              },
            }}
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <Upload
                  onChange={(info) => {
                    const file = info.fileList[0]?.originFileObj ?? null;
                    onChange(file);
                  }}
                  maxCount={1}
                  className="flex flex-1"
                  beforeUpload={() => false}
                  onRemove={() => onChange(null)}
                >
                  <Button>
                    انتخاب عکس
                    <FaCloudUploadAlt />
                  </Button>
                </Upload>
              );
            }}
            name={"imageFile"}
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-(--gray-700)">
              انتخاب محصول
            </span>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "این فیلد الزامی است",
                },
              }}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    style={{ width: "100%" }}
                    onChange={onChange}
                    options={productsOptions}
                    labelRender={(prop) => <span>{prop.label}</span>}
                    value={value}
                  />
                );
              }}
              name={"productId"}
            />
          </div>
        </form>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            color="primary"
            variant="solid"
            onClick={onSubmit}
            className="btn-md flex items-center justify-center"
            icon={<IoIosAddCircle size="16" />}
            loading={isLoading || rtk.isLoading}
            disabled={isLoading || !isValid || rtk.isLoading}
          >
            <span className="text-base font-semibold">تایدد</span>
          </Button>

          <Button
            onClick={() => onClose()}
            color="primary"
            variant="outlined"
            className="btn-md flex items-center justify-center"
            icon={<MdCancel size="16" />}
            disabled={isLoading || rtk.isLoading}
          >
            <span className="text-base font-semibold">انصراف</span>
          </Button>
        </div>{" "}
      </div>
    </Modal>
  );
}
