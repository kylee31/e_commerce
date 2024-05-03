import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
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
import AlertAnswer from "./AlertAnswer";
import { TableCell, TableRow } from "../ui/table";

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
  const [productOrderStatus, setProductOrderStatus] = useState(item.Status);
  const [isEditOrderStatus, setIsEditOrderStatus] = useState(false);

  const handleOrderCancle = async () => {
    const productInfo = await getDoc(doc(db, "product", item.productId)).then(
      (doc) => doc.data()
    );
    const orderDocRef = doc(db, "order", item.id);
    const productDocRef = doc(db, "product", item.productId);
    await updateDoc(orderDocRef, { Status: OrderStatus.CANCLED });
    await updateDoc(productDocRef, {
      productQunatity:
        (productInfo as DocumentData).productQunatity + item.productQunatity,
    });
    await setProductOrderStatus(OrderStatus.CANCLED);
  };

  const handleEditOrderStatus = async () => {
    if (isEditOrderStatus) {
      const docRef = doc(db, "order", item.id);
      await setProductOrderStatus(changeOrderStatus);
      await updateDoc(docRef, { Status: changeOrderStatus }).then(() => {
        setIsEditOrderStatus(false);
      });
      if (changeOrderStatus === OrderStatus.CANCLED) {
        const productInfo = await getDoc(
          doc(db, "product", item.productId)
        ).then((doc) => doc.data());
        const productDocRef = doc(db, "product", item.productId);
        await updateDoc(productDocRef, {
          productQunatity:
            (productInfo as DocumentData).productQunatity +
            item.productQunatity,
        });
      }
    } else {
      setIsEditOrderStatus(true);
    }
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
            {productOrderStatus}
            {!isSeller && productOrderStatus !== OrderStatus.CANCLED && (
              <AlertAnswer
                answer="해당 상품 주문을 취소할까요?"
                trueButton="진행"
                falseButton="취소"
                onTrueClick={handleOrderCancle}
              >
                <Button type="button">주문 취소</Button>
              </AlertAnswer>
            )}
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
