export interface Order {
  id: number;
  fullName: string;
  isPay: boolean;
  paymentDate: string;
  createDate: string;
  orderItemResponse: OrderItemResponse[];
}

export interface OrderItemResponse {
  id: number;
  count: number;
  productName: string;
  imageName: string;
  price: number;
}

export interface AddItemRequest {
  productId: number;
  count: number;
}

export interface DeleteItemRequest {
  orderId: number;
  orderItemId: number;
}
