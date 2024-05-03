import OrderForm from "@/components/buyer/OrderForm";

const OrderSheet = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-8">주문서 작성</div>
      </div>
      <OrderForm />
    </div>
  );
};

export default OrderSheet;
