import { Button } from "../ui/button";
import { db } from "@/firebase";
import { CartItemsType } from "@/types/CartType";
import { DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { useUser } from "@/services/UserProvider";
import { useCartItemsCountState, useCartItemsState } from "@/stores/cartStore";

const PaymentModal = ({ onCancleClick }: { onCancleClick: () => void }) => {
  const userId = useUser();
  const nowDate = new Date();
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();

  const handlePayment = () => {
    //결제 클릭하면 zustand state를 최종적으로 확인하고 결제 완료 시 DB에 올리기
    cartItems.forEach(async (item: DocumentData, idx) => {
      if (userId) {
        const cartItemsRef = doc(collection(db, "order"));
        const cartItemsId = cartItemsRef.id;
        const buyerCartItems: CartItemsType = {
          id: cartItemsId,
          sellerId: item.sellerId,
          buyerId: userId,
          productId: item.id,
          productQunatity: cartItemsCount[idx],
          Status: "PROCESSING",
          createdAt: nowDate,
          updatedAt: nowDate,
        };
        await setDoc(cartItemsRef, buyerCartItems);
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-2/3 h-2/3 flex items-center justify-center">
        <div onClick={onCancleClick}>닫기</div>폼 작성하기
        <Button type="submit">결제</Button>
      </div>
    </div>
  );
};

export default PaymentModal;
