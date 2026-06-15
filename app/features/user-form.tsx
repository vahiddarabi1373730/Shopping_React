import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useAddUserMutation,
  useEditUserMutation,
} from "@/app/api/services/user";
import { UserInterface } from "@/app/api/models/User";
export interface UserFormFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export interface UserFormProps {
  counter: number;
  handleLoading: (loading: boolean) => void;
  isEdit: boolean;
  user: UserInterface | null;
  closeModal: () => void;
}
export default function UserForm({
  counter,
  handleLoading,
  isEdit,
  user,
  closeModal,
}: UserFormProps) {
  const { control, getValues, reset } = useForm<UserInterface>();
  const [callerAdd, { isError, isLoading, data }] = useAddUserMutation();

  const [callerEdit, responseRtk] = useEditUserMutation();

  useEffect(() => {
    if (counter === 0) return;
    console.log(counter);
    handleLoading(true);
    const submit = async () => {
      const request: UserInterface = {
        email: getValues().email,
        firstName: getValues().firstName,
        address: getValues().address,
        lastName: getValues().lastName,
        password: getValues().password,
      };
      if (isEdit) {
        request.id = user?.id;
      }
      try {
        if (isEdit) {
          await callerEdit(request);
        } else {
          await callerAdd(request);
        }
        handleLoading(isEdit ? responseRtk.isLoading : isLoading);
        closeModal();
      } catch (error) {
        handleLoading(isEdit ? responseRtk.isLoading : isLoading);
      }
    };
    submit();
  }, [counter]);
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-700)">نام</span>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input onChange={onChange} value={value} />
            )}
            defaultValue={isEdit ? user?.firstName : undefined}
            name="firstName"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-700)">
            نام خانوادگی
          </span>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name="lastName"
            defaultValue={isEdit ? user?.lastName : undefined}
          />
        </div>
        {!isEdit && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-(--gray-700)">
              رمز عبور
            </span>
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input onChange={onChange} value={value} />
              )}
              name="password"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-700)">ایمیل</span>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name="email"
            defaultValue={isEdit ? user?.email : undefined}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-700)">آدرس</span>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name="address"
            defaultValue={isEdit ? user?.address : undefined}
          />
        </div>
      </form>
    </div>
  );
}

export function UserFormFooter({
  onCancel,
  onSubmit,
  loading,
}: UserFormFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        className="btn-md"
        type="primary"
        loading={loading}
        onClick={onSubmit}
      >
        ثبت کاربر
      </Button>
      <Button
        className="btn-md"
        variant="outlined"
        color="primary"
        onClick={onCancel}
        disabled={loading}
      >
        انصراف
      </Button>
    </div>
  );
}
