import OrderItem from "@/components/common/OrderItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrderItemsInfo from "@/hooks/useGetOrderItemsInfo";
import { DocumentData } from "firebase/firestore";

const OrderCartItems = () => {
  const { orderItems } = useGetOrderItemsInfo("buyerId");

  if (!orderItems) {
    return <></>;
  }

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
          {orderItems.length > 0 ? (
            orderItems.map((item: DocumentData, idx) => (
              <OrderItem
                key={`orderItem_${idx}`}
                item={item}
                isSeller={false}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>주문 내역이 없습니다</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderCartItems;
