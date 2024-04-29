import { useCartStore } from "@/stores/cartStore";
import { DocumentData } from "firebase/firestore";

const useCalcTotalPrice = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);
  let totalPrice = 0;
  cartItems.forEach((item: DocumentData, idx) => {
    totalPrice += item.productPrice * cartItemsCount[idx];
  });
  return totalPrice;
};

export default useCalcTotalPrice;
