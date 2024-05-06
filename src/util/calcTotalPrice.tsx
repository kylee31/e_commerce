import { DocumentData } from "firebase/firestore";

const calcTotalPrice = (cartItems: object[], cartItemsCount: number[]) => {
  let totalPrice = 0;
  cartItems.forEach((item: DocumentData, idx) => {
    totalPrice += item.productPrice * cartItemsCount[idx];
  });
  return totalPrice;
};

export default calcTotalPrice;
