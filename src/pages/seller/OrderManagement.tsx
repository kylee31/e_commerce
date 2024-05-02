import OrderItem from "@/components/common/OrderItem";
import useGetOrderItemsInfo from "@/hooks/useGetOrderItemsInfo";

const OrderManagement = () => {
  const { orderItems } = useGetOrderItemsInfo("sellerId");

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-8">주문 관리</div>
      </div>
      <div>
        {orderItems.map((item, idx) => (
          <OrderItem
            key={`sellerOrderItems_${idx}`}
            item={item}
            isSeller={true}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
