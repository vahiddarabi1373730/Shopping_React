import { coreApi } from "@/app/core/RTK_Query/core-api";
import { BaseResponse } from "@/app/api/models/base-response";
import { Product } from "@/app/api/models/product";
import { invalidateIfSuccess } from "@/app/share/helpers/handel-invalid-tags";
import build from "next/dist/build";
import { useState } from "react";

export const enhanceProductApi = coreApi.enhanceEndpoints({
  addTagTypes: ["product", "table"],
});

let shouldRefetch = false;

export const handelRefetch = (refetch: boolean) => {
  shouldRefetch = refetch;
};

export const productApi = enhanceProductApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation<boolean, FormData>({
      query: (formData) => ({
        url: "Product/CreateProduct/create-product",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["table"],
    }),
    createProductGallery: build.mutation<boolean, FormData>({
      query: (formData) => ({
        url: "ProductGallery/CreateProduct/create-product-gallery",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: invalidateIfSuccess("table"),
    }),
    editProduct: build.mutation<boolean, FormData>({
      query: (formData) => ({
        url: `Product/Edit/${formData.get("id")}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["table"],
    }),
    deleteProduct: build.mutation<boolean, number>({
      query: (id) => ({
        url: `Product/DeleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["table"],
    }),
    loadProduct: build.query<BaseResponse<Product>, { id: string }>({
      query: ({ id }) => ({
        url: `Product/GetProductById/${id}`,
        method: "GET",
      }),
      forceRefetch: () => shouldRefetch,
    }),
    loadProducts: build.query<BaseResponse<Product[]>, void>({
      query: () => ({
        url: `Product/GetFilterProducts`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useCreateProductGalleryMutation,
  useLoadProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useLoadProductsQuery,
} = productApi;
