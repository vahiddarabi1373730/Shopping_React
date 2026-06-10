import { coreApi } from "@/app/core/RTK_Query/core-api";
import { Category, CreateCategoryRequest } from "@/app/api/models/Category";
import { BaseResponse } from "@/app/api/models/base-response";

export const enhanceCategoryApi = coreApi.enhanceEndpoints({
  addTagTypes: ["category"],
});

export const categoryApi = enhanceCategoryApi.injectEndpoints({
  endpoints: (build) => ({
    loadCategories: build.mutation<boolean, CreateCategoryRequest>({
      query: (body) => ({
        url: "ProductCategory/Create",
        method: "POST",
        data: body,
      }),
    }),
    loadCategory: build.query<BaseResponse<Category>, { id: string }>({
      query: ({ id }) => ({
        url: `ProductCategory/GetProductById/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoadCategoriesMutation, useLoadCategoryQuery } = categoryApi;
