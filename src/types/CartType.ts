import { DocumentData } from "firebase/firestore";

export type CartType = {
  cartItems: object[];
  cartItemsCount: number[];
  addToCart: (product: DocumentData, cnt: number) => void;
  deleteToCart: (idx: number) => void;
  clearToCart:()=>void,
  updateCountCartItem: (idx: number, cnt: number) => void;
};

export type CartItemsType={
  merchantUid:string,
  id:string,
  sellerId:string,
  buyerId?:string,
  productId:string,
  productName:string,
  productTotalPrice:number,
  productQunatity:number,
  Status:string,
  createdAt?:object,
  updatedAt:object
}

export type OrderFormType={
  type:string,
  label:string,
  value:string,
  placeholder:string,
  register:object
}
