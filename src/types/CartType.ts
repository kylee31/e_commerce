import { DocumentData } from "firebase/firestore";

export type CartType = {
    cartItems: object[];
    cartItemsCount: number[];
    addToCart: (product: DocumentData, cnt: number) => void;
    deleteToCart: (idx: number) => void;
    increaseCartItem: (idx: number, cnt: number) => void;
    decreaseCartItem: (idx: number, cnt: number) => void;
  };