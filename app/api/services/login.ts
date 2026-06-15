import { coreApi } from "@/app/core/RTK_Query/core-api";
import { BaseResponse } from "@/app/api/models/base-response";
import { LoginRequest, LoginResponse } from "@/app/api/models/login";

export const enhanceApi = coreApi.enhanceEndpoints({
  addTagTypes: ["auth"],
});
export const authApi = enhanceApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: "register", method: "POST", data }),
      invalidatesTags: ["auth"],
    }),
    users: builder.query({
      query: () => ({ url: "users", method: "GET" }),
      providesTags: ["auth"],
    }),
    categories: builder.query<any, void>({
      query: () => ({
        url: "ProductCategory/GetAllProductCategory",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useUsersQuery, useCategoriesQuery } =
  authApi;
