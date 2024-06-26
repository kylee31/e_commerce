import {
  ProductCategoryType,
  ProductInputListType,
  ProductFieldDataType,
} from "@/types/ProductType";

export const ProductCategory: string[] = [
  "홈리빙",
  "공예",
  "반려동물",
  "식품",
  "기타",
];

export const ProductCategoryInfo: ProductCategoryType[] = [
  {
    cate: "홈리빙",
    url: "/imgs/logo2.webp",
  },
  {
    cate: "공예",
    url: "/imgs/logo.webp",
  },
  {
    cate: "반려동물",
    url: "/imgs/logo3.webp",
  },
  {
    cate: "식품",
    url: "/imgs/logo2.webp",
  },
  {
    cate: "기타",
    url: "/imgs/logo.webp",
  },
];

export const ProductInputData: ProductInputListType[] = [
  {
    label: "상품명",
    type: "text",
    value: "productName",
  },
  {
    label: "카테고리",
    type: "text",
    value: "productCategory",
  },
  {
    label: "가격",
    type: "text",
    value: "productPrice",
  },
];

export const productFieldData: ProductFieldDataType[] = [
  {
    label: "상품명",
    value: "productName",
  },
  {
    label: "카테고리",
    value: "productCategory",
  },
  {
    label: "가격",
    value: "productPrice",
  },
];
