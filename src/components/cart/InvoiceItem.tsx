import { TableCell, TableRow } from "../ui/table";
import { DocumentData } from "firebase/firestore";
import {
  useCartItemsCountState,
  useCartItemsState,
  useDeleteToCartAction,
  useUpdateCountCartItemAction,
} from "@/stores/cartStore";
import { useState } from "react";
import convertKRW from "@/util/convertKRW";
import { Link } from "react-router-dom";

const InvoiceItem = ({
  info,
  isImage,
}: {
  info: DocumentData;
  isImage?: boolean;
}) => {
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();
  const itemIndex = cartItems.indexOf(info);
  const [count, setCount] = useState(cartItemsCount[itemIndex]);
  const [isEdit, setIsEdit] = useState(false);
  const productSum = convertKRW(info.productPrice * count);

  const setUpdateCountCartItem = useUpdateCountCartItemAction();
  const setDeleteToCart = useDeleteToCartAction();

  const handleEditQuantity = () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      setUpdateCountCartItem(itemIndex, count);
    }
  };

  const handlePlusCounter = () => {
    if (count < 100 && isEdit && count < info.productQunatity) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1 && isEdit) {
      setCount(count - 1);
    }
  };

  const handleDeleteCartItem = () => {
    setDeleteToCart(itemIndex);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center">
          {isImage ? (
            <>
              <img
                src={info.productImages[0]}
                alt=""
                width={80}
                height={80}
                className="mr-8"
              />
              <Link
                to={`/category/${info.productCategory}/${info.id}`}
                className="border-b border-black"
              >
                {info.productName}
              </Link>
            </>
          ) : (
            <>{info.productName}</>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-between items-center">
          {isEdit && (
            <div
              onClick={handleMinusCounter}
              className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
            >
              -
            </div>
          )}
          <span>{count}개</span>
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
      <TableCell>
        <div className="w-full flex justify-between">
          {productSum}
          <div
            className="bg-black rounded-full text-white size-5 flex justify-center items-center hover:cursor-pointer"
            onClick={handleDeleteCartItem}
          >
            x
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
