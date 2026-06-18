export interface Product {
  productName: string;
  shortDescription: string;
  description: string;
  imageName: string;
  price: number;
  isExists: boolean;
  isSpecial: boolean;
  images: ProductImage[];
  id: string;
}

export interface ProductImage {
  imageName: string;
  productId: number;
}

export interface ProductArg {
  request: ProductArgRequest;
  id?: string;
}

export interface ProductArgRequest {
  productName: string;
  shortDescription: string;
  description: string;
  imageFile: any;
  price: number;
  isExists: boolean;
  isSpecial: boolean;
  createDate: any;
}

export interface ProductImageArg {
  productId: string;
  imageFile: any;
}