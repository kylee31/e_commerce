import { TableCell, TableRow } from "../ui/table";
import { DocumentData } from "firebase/firestore";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

const InvoiceItem = ({ info }: { info: DocumentData }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const itemIndex = cartItems.indexOf(info);
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);
  const productSum = info.productPrice * cartItemsCount[itemIndex];

  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState(cartItemsCount[itemIndex]);
  const setIncreaseCartItem = useCartStore((state) => state.increaseCartItem);
  const setDecreaseCartItem = useCartStore((state) => state.decreaseCartItem);
  const setDeleteToCart = useCartStore((state) => state.deleteToCart);

  const handleEditQuantity = () => {
    setIsEdit(!isEdit);
  };

  const handlePlusCounter = () => {
    if (count < 100 && isEdit) {
      setCount(count + 1);
      setIncreaseCartItem(itemIndex, 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1 && isEdit) {
      setCount(count - 1);
      setDecreaseCartItem(itemIndex, 1);
    }
  };

  const handleDeleteCartItem = () => {
    setDeleteToCart(itemIndex);
  };

  return (
    <TableRow>
      <TableCell>{info.productName}</TableCell>
      <TableCell>
        <div className="w-full flex justify-between items-center">
          {isEdit && (
            <div
              onClick={handleMinusCounter}
              className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
            >
              -
            </div>
          )}
          <span>{cartItemsCount[itemIndex]}개</span>
          {isEdit && (
            <div
              onClick={handlePlusCounter}
              className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
            >
              +
            </div>
          )}
          <span onClick={handleEditQuantity} className="text-xs">
            {isEdit ? "[완료]" : "[수정]"}
          </span>
        </div>
      </TableCell>
      <TableCell className="flex justify-between">
        {productSum}
        <div
          className="bg-black rounded-full text-white size-5 flex justify-center items-center hover:cursor-pointer"
          onClick={handleDeleteCartItem}
        >
          x
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
