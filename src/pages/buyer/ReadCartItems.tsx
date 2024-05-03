import CartTable from "@/components/cart/CartTable";
import AlertAnswer from "@/components/common/AlertAnswer";
import { Button } from "@/components/ui/button";
import { useCartItemsState } from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";

const ReadCartItems = () => {
  const navigate = useNavigate();
  const cartItems = useCartItemsState();
  const handleGoOrderSheet = () => {
    if (cartItems.length > 0) {
      navigate("order-sheet");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-6">장바구니 상품 목록</div>
        {cartItems.length > 0 && (
          <AlertAnswer
            answer="최종 주문하시겠습니까?"
            text="배송지 작성 및 결제 단계로 넘어갑니다"
            trueButton="진행"
            falseButton="취소"
            onTrueClick={handleGoOrderSheet}
          >
            <Button type="button">주문하기</Button>
          </AlertAnswer>
        )}
      </div>
      <div className={`w-full ${cartItems.length > 0 ? "" : "h-80"}`}>
        <CartTable
          isImage={true}
          className={"border-2"}
          isEditPossible={true}
        />
      </div>
    </div>
  );
};

export default ReadCartItems;
