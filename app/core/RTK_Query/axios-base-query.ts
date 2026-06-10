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
      console.log(axiosError);
      return {
        error: HandleError(axiosError.response?.status, axiosError),
      };
    }
  };

export function HandleError(status: number, axiosError: any): ErrorResponse {
  switch (status) {
    case 404:
      return {
        message: "آدرس یافت نشد",
        status: 404,
      };
    default:
      return {
        message: axiosError.response?.data ?? axiosError.message,
        status: status,
      };
  }
}
