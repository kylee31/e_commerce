import { TableCell, TableRow } from "../ui/table";
import { DocumentData } from "firebase/firestore";
import {
  useCartItemsCountState,
  useCartItemsState,
  useDeleteToCartAction,
  useUpdateCountCartItemAction,
} from "@/services/stores/cartStore";
import { useEffect, useState } from "react";
import convertKRW from "@/util/convertKRW";
import { Link } from "react-router-dom";
import InvoiceQunatityCounter from "./InvoiceQunatityCounter";
import useGetProductInfo from "@/hooks/useGetProductInfo";

const InvoiceItem = ({
  info,
  isImage,
  isEditPossible,
}: {
  info: DocumentData;
  isImage?: boolean;
  isEditPossible: boolean;
}) => {
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();
  const itemIndex = cartItems.indexOf(info);
  const { productInfo } = useGetProductInfo(info.id);
  const newProductQunatity = productInfo
    ? (productInfo as DocumentData).productQunatity
    : 0;
  const isOutOfStock = newProductQunatity - cartItemsCount[itemIndex] < 0;
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

  const handleDeleteCartItem = () => {
    setDeleteToCart(itemIndex);
  };

  useEffect(() => {
    setCount(cartItemsCount[itemIndex]);
  }, [cartItemsCount, itemIndex]);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center">
          {isImage ? (
            <div className="w-full flex justify-start items-center">
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
            </div>
          ) : (
            <div>{info.productName}</div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-between items-center">
          <InvoiceQunatityCounter
            isEdit={isEdit}
            isOutOfStock={isOutOfStock}
            info={info}
            count={count}
            setCount={setCount}
          />
          <span onClick={handleEditQuantity} className="text-xs">
            {isEditPossible && !isOutOfStock && (isEdit ? "[완료]" : "[수정]")}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="w-full flex justify-between">
          {productSum}
          {isEditPossible && (
            <div
              className="bg-black rounded-full text-white size-5 flex justify-center items-center hover:cursor-pointer"
              onClick={() => handleDeleteCartItem()}
            >
              x
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
