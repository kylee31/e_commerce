import PaymentModal from "@/components/buyer/PaymentModal";
import CartTable from "@/components/cart/CartTable";
import AlertAnswer from "@/components/common/AlertAnswer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ReadCartItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePopModalPayment = () => {
    setIsModalOpen(true);
  };

  const handleCanclePayment = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-6">장바구니 상품 목록</div>
        <AlertAnswer
          answer="최종 주문하시겠습니까?"
          text="배송지 작성 및 결제 단계로 넘어갑니다"
          trueButton="결제"
          falseButton="취소"
          onTrueClick={handlePopModalPayment}
        >
          <Button type="button">주문하기</Button>
        </AlertAnswer>
      </div>
      <div className="w-full h-full">
        <CartTable isImage={true} className={"border-2"} />
      </div>
      {isModalOpen && <PaymentModal onCancleClick={handleCanclePayment} />}
    </div>
  );
};

export default ReadCartItems;
