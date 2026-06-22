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
  isValid: boolean;
}

export interface UserFormProps {
  counter: number;
  handleLoading: (loading: boolean) => void;
  isEdit: boolean;
  user: UserInterface | null;
  closeModal: () => void;
  handIsValidForm: (isValid: boolean) => void;
}
export default function UserForm({
  counter,
  handleLoading,
  isEdit,
  user,
  closeModal,
  handIsValidForm,
}: UserFormProps) {
  const {
    control,
    getValues,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<UserInterface>({ mode: "onChange" });
  const [callerAdd, { isError, isLoading, data }] = useAddUserMutation();

  const [callerEdit, responseRtk] = useEditUserMutation();

  useEffect(() => {
    handIsValidForm(isValid);
  }, [watch()]);
  useEffect(() => {
    if (counter === 0) return;
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
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error, isDirty, isTouched },
            }) => (
              <>
                <Input onChange={onChange} value={value} onBlur={onBlur} />
                {error && isDirty && isTouched && (
                  <span className="!text-xs font-medium text-(--red-500) !text-xs">
                    {error.message}
                  </span>
                )}
              </>
            )}
            rules={{
              required: {
                value: true,
                message: "این فیلد الزامی است.",
              },
            }}
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
            rules={{
              required: true,
            }}
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
              rules={{
                required: true,
              }}
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
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error, isDirty, isTouched },
            }) => (
              <>
                <Input onChange={onChange} value={value} onBlur={onBlur} />
                {error && isDirty && isTouched && (
                  <span className="!text-xs font-medium text-(--red-500)">
                    {error.message}
                  </span>
                )}
              </>
            )}
            name="email"
            defaultValue={isEdit ? user?.email : undefined}
            rules={{
              required: "این فیلد الزامی است.",
              validate: (value) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value) || "ایمیل معتبر نیست";
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-(--gray-700)">آدرس</span>
          <Controller
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { error, isDirty, isTouched },
            }) => (
              <>
                <Input onChange={onChange} value={value} />
                {error && isDirty && isTouched && (
                  <span className="!text-xs font-medium text-(--red-500)">
                    {error.message}
                  </span>
                )}
              </>
            )}
            name="address"
            defaultValue={isEdit ? user?.address : undefined}
            rules={{
              required: true,
            }}
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
  isValid,
}: UserFormFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        className="btn-md"
        type="primary"
        loading={loading}
        onClick={onSubmit}
        disabled={!isValid}
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
