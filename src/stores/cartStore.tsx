import { CartType } from "@/types/CartType";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

const initialCartItems = {
  cartItems: [],
  cartItemsCount: [],
};

export const useCartStore = create(
  devtools(
    persist<CartType>(
      (set) => ({
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
        clearToCart: () =>
          set((state) => {
            return { ...state, cartItems: [], cartItemsCount: [] };
          }),
        updateCountCartItem: (idx, cnt) =>
          set((state) => {
            const updatedCartItems = [...state.cartItemsCount];
            updatedCartItems[idx] = cnt;
            return { ...state, cartItemsCount: updatedCartItems };
          }),
      }),
      {
        name: "cartItems",
      }
    )
  )
);

//state
export const useCartItemsState = () => useCartStore((state) => state.cartItems);
export const useCartItemsCountState = () =>
  useCartStore((state) => state.cartItemsCount);
//action
export const useAddToCartAction = () =>
  useCartStore((state) => state.addToCart);
export const useDeleteToCartAction = () =>
  useCartStore((state) => state.deleteToCart);
export const useClearToCartAction = () =>
  useCartStore((state) => state.clearToCart);
export const useUpdateCountCartItemAction = () =>
  useCartStore((state) => state.updateCountCartItem);
