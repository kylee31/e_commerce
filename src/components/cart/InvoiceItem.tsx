import { TableCell, TableRow } from "../ui/table";
import { DocumentData } from "firebase/firestore";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

const InvoiceItem = ({ info }: { info: DocumentData }) => {
  //const totalProductPrice = count * Number(info.productPrice);
  const cartItems = useCartStore((state) => state.cartItems);
  const itemIndex = cartItems.indexOf(info);
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);
  const productSum = info.productPrice * cartItemsCount[itemIndex];

  const [count, setCount] = useState(cartItemsCount[itemIndex]);
  const setIncreaseCartItem = useCartStore((state) => state.increaseCartItem);
  const setDecreaseCartItem = useCartStore((state) => state.decreaseCartItem);
  const setDeleteToCart = useCartStore((state) => state.deleteToCart);

  const handlePlusCounter = () => {
    if (count < 100) {
      setCount(count + 1);
      setIncreaseCartItem(itemIndex, 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1) {
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
          <div
            onClick={handleMinusCounter}
            className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
          >
            -
          </div>
          <span>{count}</span>
          <div
            onClick={handlePlusCounter}
            className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
          >
            +
          </div>
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
