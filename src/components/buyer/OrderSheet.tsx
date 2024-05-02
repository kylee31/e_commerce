import { useState } from "react";
import PaymentModal from "@/components/buyer/PaymentModal";
import OrderForm from "@/components/buyer/OrderForm";

const OrderSheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCanclePayment = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-8">주문서 작성</div>
      </div>
      <OrderForm setIsModalOpen={setIsModalOpen} />
      <div>
        {isModalOpen && <PaymentModal onCancleClick={handleCanclePayment} />}
      </div>
    </div>
  );
};

export default OrderSheet;
