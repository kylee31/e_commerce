import { DocumentData } from "firebase/firestore";
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
import AlertAnswer from "./AlertAnswer";
import { TableCell, TableRow } from "../ui/table";
import {
  cancleBuyerOrderStatus,
  editOrderStatus,
} from "@/services/orderService";

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
  const [productOrderStatus, setProductOrderStatus] = useState<string>(
    item.Status
  );
  const productOrderStatusText = {
    [OrderStatus.PROCESSING]: "주문 완료",
    [OrderStatus.PENDING]: "배송 대기",
    [OrderStatus.SHIPPED]: "배송 진행",
    [OrderStatus.CANCLED]: "주문 취소",
  };
  const [isEditOrderStatus, setIsEditOrderStatus] = useState(false);

  const handleEditOrderStatus = async () => {
    if (isEditOrderStatus) {
      await editOrderStatus({
        item,
        changeOrderStatus,
        setProductOrderStatus,
        setIsEditOrderStatus,
      });
    } else {
      setIsEditOrderStatus(true);
    }
  };

  const handleOrderCancle = async () => {
    await cancleBuyerOrderStatus({ item });
    await setProductOrderStatus(OrderStatus.CANCLED);
  };

  return (
    <TableRow className="w-full">
      <TableCell> {item.merchantUid}</TableCell>
      <TableCell>{item.productName}</TableCell>
      <TableCell>{item.productTotalPrice}</TableCell>
      <TableCell>{item.productQunatity}</TableCell>
      <TableCell className="w-full flex justify-between items-center">
        {isSeller && isEditOrderStatus ? (
          <Select
            defaultValue={productOrderStatus}
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
          </Select>
        ) : (
          <div className="w-full flex justify-between items-center">
            {productOrderStatusText[productOrderStatus]}
            <AlertAnswer
              answer="해당 상품 주문을 취소할까요?"
              trueButton="진행"
              falseButton="취소"
              onTrueClick={handleOrderCancle}
            >
              <Button
                type="button"
                className={`${
                  !isSeller && productOrderStatus === OrderStatus.PROCESSING
                    ? "visible"
                    : "invisible"
                }`}
              >
                주문 취소
              </Button>
            </AlertAnswer>
          </div>
        )}
        {isSeller && (
          <div>
            <Button onClick={handleEditOrderStatus}>
              {isEditOrderStatus ? "완료" : "수정"}
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
