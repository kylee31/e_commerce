export type ProductInputListType = {
  label: string;
  type: string;
  value: "productPrice" | "productCategory" | "productName";
};

export type ProductInputsType = {
  id?: string;
  sellerId?: string;
  productName: string;
  productPrice: number;
  productQunatity: number;
  productDescription: string;
  productCategory: string;
  productImages: string[];
  createdAt?: object;
  updatedAt: object;
};

export type ProductCategoryType = {
  cate: string;
  url: string;
};

export type ProductFieldDataType = {
  label: string;
  value: string;
};

export type ProductInfiniteFetchingType = {
  [x: string]: any;
};
