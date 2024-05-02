import { Button } from "../ui/button";
import { db } from "@/firebase";
import { CartItemsType } from "@/types/CartType";
import { DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { useUser } from "@/services/UserProvider";
import {
  useCartItemsCountState,
  useCartItemsState,
  useDeleteToCartAction,
} from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import AlertAnswer from "../common/AlertAnswer";

const PaymentModal = ({ onCancleClick }: { onCancleClick: () => void }) => {
  const navigate = useNavigate();
  const userId = useUser();
  const nowDate = new Date();
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();
  const setDeleteToCart = useDeleteToCartAction();

  const onPaymentSubmit = async () => {
    //결제 클릭하면 zustand state를 최종적으로 확인하고 결제 완료 시 DB에 올리기
    onCancleClick();
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
        cartItems.forEach(async (_, idx) => await setDeleteToCart(idx));
        await navigate("/buyer/order-list");
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-1/2 h-2/3 flex items-center justify-center relative">
        <AlertAnswer
          answer="결제를 취소하시겠습니까?"
          text="취소 시 주문서 작성 단계로 돌아갑니다"
          trueButton="취소"
          falseButton="진행"
          onTrueClick={onCancleClick}
        >
          <div className="absolute top-4 right-4">취소</div>
        </AlertAnswer>
        <div>결제 완료</div>
        <Button type="button" onClick={onPaymentSubmit}>
          결제
        </Button>
      </div>
    </div>
  );
};

export default PaymentModal;
