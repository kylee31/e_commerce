import OrderItem from "@/components/common/OrderItem";
import useGetOrderItemsInfo from "@/hooks/useGetOrderItemsInfo";

const OrderCartItems = () => {
  const { orderItems } = useGetOrderItemsInfo("buyerId");

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-6">주문 목록</div>
      </div>
      <div>
        {orderItems.map((item, idx) => (
          <OrderItem key={`orderItem_${idx}`} item={item} isSeller={false} />
        ))}
      </div>
    </div>
  );
};

export default OrderCartItems;
