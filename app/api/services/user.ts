import { coreApi } from "@/app/core/RTK_Query/core-api";
import { UserInterface } from "@/app/api/models/User";

export const enhanceUserApi = coreApi.enhanceEndpoints({
  addTagTypes: ["user", "table"],
});

export const userApi = enhanceUserApi.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<boolean, UserInterface>({
      query: (body: UserInterface) => ({
        url: "User/Add",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["table"],
    }),
    editUser: build.mutation<boolean, UserInterface>({
      query: (body: UserInterface) => ({
        url: `User/Edit/${body.id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["table"],
    }),
  }),
});

export const { useAddUserMutation, useEditUserMutation } = userApi;
