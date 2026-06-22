import { coreApi } from "@/app/core/RTK_Query/core-api";
import { BaseResponse } from "@/app/api/models/base-response";
import {
  AddItemRequest,
  DeleteItemRequest,
  Order,
} from "@/app/api/models/order";

export const enhanceOrderApi = coreApi.enhanceEndpoints({
  addTagTypes: ["order", "table", "order-item"],
});

let shouldRefetch = false;

export const handelRefetch = (refetch: boolean) => {
  shouldRefetch = refetch;
};

export const productApi = enhanceOrderApi.injectEndpoints({
  endpoints: (build) => ({
    addItem: build.mutation<BaseResponse<Order[]>, AddItemRequest>({
      query: (body) => ({
        url: "Order/AddProductToOrder",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["table"],
    }),
    deleteItem: build.mutation<boolean, DeleteItemRequest>({
      query: (request) => ({
        url: `Order/GetBasket/orders/${request.orderId}/items/${request.orderItemId}`,
        method: "DELETE",
        params: request,
      }),
      invalidatesTags: ["table"],
    }),
  }),
});

export const { useAddItemMutation, useDeleteItemMutation } = productApi;
