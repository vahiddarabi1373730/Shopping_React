import { coreApi } from "@/app/core/RTK_Query/core-api";
import { Category, CategoryArg } from "@/app/api/models/Category";
import { BaseResponse } from "@/app/api/models/base-response";

export const enhanceCategoryApi = coreApi.enhanceEndpoints({
  addTagTypes: ["category", "table"],
});

export const categoryApi = enhanceCategoryApi.injectEndpoints({
  endpoints: (build) => ({
    createCategories: build.mutation<boolean, CategoryArg>({
      query: (body) => ({
        url: "ProductCategory/Create",
        method: "POST",
        data: body.request,
      }),
      invalidatesTags: ["table"],
    }),
    editCategory: build.mutation<boolean, CategoryArg>({
      query: (arg) => ({
        url: `ProductCategory/Edit/${arg.id}`,
        method: "PUT",
        data: arg.request,
      }),
      invalidatesTags: ["table"],
    }),
    deleteCategory: build.mutation<boolean, string>({
      query: (id) => ({
        url: `ProductCategory/Delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["table"],
    }),
    loadCategory: build.query<BaseResponse<Category>, { id: string }>({
      query: ({ id }) => ({
        url: `ProductCategory/GetProductById/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoriesMutation,
  useLoadCategoryQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
