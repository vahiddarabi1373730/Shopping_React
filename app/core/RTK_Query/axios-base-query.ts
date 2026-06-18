import { axiosInstance } from "@/app/core/RTK_Query/axios-instance";
import { AxiosRequestConfig, Method } from "axios";
import { ErrorResponse } from "@/app/api/models/error-response";

export const axiosBaseQuery =
  <TResponse>() =>
  async ({
    url,
    method,
    data,
    params,
  }: AxiosRequestConfig): Promise<
    { data: TResponse } | { error: ErrorResponse }
  > => {
    try {
      const result = await axiosInstance<TResponse>({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const status = axiosError.response?.status;
      const handled = HandleError(status, axiosError);
      return {
        error: {
          status: handled.status,
          message: handled.message,
        },
      };
    }
  };

export function HandleError(status: number, axiosError: any): ErrorResponse {
  const serverData = axiosError.response?.data;
  let errorMessage = "خطای ناشناخته";

  if (serverData?.errors) {
    const errorValues = Object.values(serverData.errors);
    if (errorValues.length > 0 && Array.isArray(errorValues[0])) {
      errorMessage = errorValues[0][0];
    }
  } else if (serverData?.message) {
    errorMessage = serverData.message;
  } else {
    errorMessage = axiosError.message || "خطای ارتباط با سرور";
  }
  switch (status) {
    case 400:
      return { message: errorMessage, status: 400 };
    case 404:
      return { message: "سرویس مورد نظر یافت نشد", status: 404 };
    case 500:
      return { message: serverData?.message || "خطای داخلی سرور", status: 500 };
    default:
      return { message: errorMessage, status: status || 500 };
  }
}
