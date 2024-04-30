import { useCartItemsCountState, useCartItemsState } from "@/stores/cartStore";
import { DocumentData } from "firebase/firestore";

const useCalcTotalPrice = () => {
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();
  let totalPrice = 0;
  cartItems.forEach((item: DocumentData, idx) => {
    totalPrice += item.productPrice * cartItemsCount[idx];
  });
  return totalPrice;
};

export default useCalcTotalPrice;
