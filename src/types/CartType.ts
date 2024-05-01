import { DocumentData } from "firebase/firestore";

export type CartType = {
  cartItems: object[];
  cartItemsCount: number[];
  addToCart: (product: DocumentData, cnt: number) => void;
  deleteToCart: (idx: number) => void;
  updateCountCartItem: (idx: number, cnt: number) => void;
};

export type CartItemsType={
  id:string,
  sellerId:string,
  buyerId?:string,
  productId:string,
  productQunatity:number,
  Status:string,
  createdAt?:object,
  updatedAt:object
}

//주문 처리(완료), 발송 대기, 발송 시작(출고), 주문 취소
export type OrderType="PROCESSING"|"PENDING"|"SHIPPED"|"CANCLED"