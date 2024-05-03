import OrderItem from "@/components/common/OrderItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrderItemsInfo from "@/hooks/useGetOrderItemsInfo";

const OrderCartItems = () => {
  const { orderItems } = useGetOrderItemsInfo("buyerId");

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="text-xl font-extrabold mb-6">주문 목록</div>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>주문번호</TableHead>
            <TableHead>상품명</TableHead>
            <TableHead>합계</TableHead>
            <TableHead>수량</TableHead>
            <TableHead>주문 상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item, idx) => (
            <OrderItem key={`orderItem_${idx}`} item={item} isSeller={false} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderCartItems;
