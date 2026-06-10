import { axiosBaseQuery } from "@/app/core/RTK_Query/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const coreApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: "coreApi",
});
