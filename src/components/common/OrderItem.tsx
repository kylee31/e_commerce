import { DocumentData, doc, updateDoc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import { db } from "@/firebase";

const OrderStatus = {
  PROCESSING: "PROCESSING",
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  CANCLED: "CANCLED",
};

const OrderItem = ({
  item,
  isSeller,
}: {
  item: DocumentData;
  isSeller: boolean;
}) => {
  const [changeOrderStatus, setChangeOrderStatus] = useState(
    OrderStatus.PROCESSING
  );

  return (
    <div className="border-2">
      <div>주문 번호: {item.merchantUid}</div>
      <div>상품명: {item.productName}</div>
      <div>합계: {item.productTotalPrice}</div>
      <div>수량: {item.productQunatity}</div>
      <div>
        주문 상태:
        {isSeller ? (
          <Select
            defaultValue={item.Status}
            onValueChange={(status) => {
              setChangeOrderStatus(status);
            }}
          >
            <SelectTrigger className="w-full border-gray-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={OrderStatus.PROCESSING}>
                  주문 완료
                </SelectItem>
                <SelectItem value={OrderStatus.PENDING}>배송 대기</SelectItem>
                <SelectItem value={OrderStatus.SHIPPED}>배송 진행</SelectItem>
                <SelectItem value={OrderStatus.CANCLED}>주문 취소</SelectItem>
              </SelectGroup>
            </SelectContent>
            <Button
              onClick={() => {
                const docRef = doc(db, "order", item.id);
                updateDoc(docRef, { Status: changeOrderStatus });
              }}
            >
              수정
            </Button>
          </Select>
        ) : (
          item.Status
        )}
      </div>
      {!isSeller && item.Status !== OrderStatus.CANCLED && (
        <Button
          onClick={async () => {
            const docRef = doc(db, "order", item.id);
            await updateDoc(docRef, { Status: OrderStatus.CANCLED });
          }}
        >
          주문 취소
        </Button>
      )}
    </div>
  );
};

export default OrderItem;
