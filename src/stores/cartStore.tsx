import { DocumentData } from "firebase/firestore";
import { create } from "zustand";

type CartType = {
  cartItems: object[];
  cartItemsCount: number[];
  addToCart: (product: DocumentData, cnt: number) => void;
  deleteToCart: (idx: number) => void;
  increaseCartItem: (idx: number, cnt: number) => void;
  decreaseCartItem: (idx: number, cnt: number) => void;
};

const initialCartItems = {
  cartItems: [],
  cartItemsCount: [],
};

export const useCartStore = create<CartType>((set) => ({
  ...initialCartItems,
  addToCart: (product, cnt) =>
    set((state) => ({
      cartItems: [...state.cartItems, product],
      cartItemsCount: [...state.cartItemsCount, cnt],
    })),
  deleteToCart: (idx) =>
    set((state) => {
      const deletedCartItems = [...state.cartItems].filter(
        (_, itemIdx) => itemIdx != idx
      );
      const deletedCartItemsCount = [...state.cartItemsCount].filter(
        (_, itemIdx) => itemIdx != idx
      );
      return {
        ...state,
        cartItems: deletedCartItems,
        cartItemsCount: deletedCartItemsCount,
      };
    }),
  increaseCartItem: (idx, cnt) =>
    set((state) => {
      const updatedCartItems = [...state.cartItemsCount];
      updatedCartItems[idx] += cnt;
      return { ...state, cartItemsCount: updatedCartItems };
    }),
  decreaseCartItem: (idx, cnt) =>
    set((state) => {
      const updatedCartItems = [...state.cartItemsCount];
      updatedCartItems[idx] -= cnt;
      return { ...state, cartItemsCount: updatedCartItems };
    }),
}));