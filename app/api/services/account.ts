import { coreApi } from "@/app/core/RTK_Query/core-api";
import { LoginInterface } from "@/app/pages/loginRegister/login";
import { RegisterInterface } from "@/app/pages/loginRegister/register";

export const enhanceAccountApi = coreApi.enhanceEndpoints({
  addTagTypes: ["account"],
});

export const accountApi = enhanceAccountApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: LoginInterface) => ({
        url: "Account/Login/login",
        data: body,
        method: "POST",
      }),
    }),
    register: build.mutation({
      query: (body: RegisterInterface) => ({
        url: "Account/Register/register",
        data: body,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = accountApi;
