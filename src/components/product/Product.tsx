import { productFieldData } from "@/services/data/ProductData";
import { DocumentData } from "firebase/firestore";
import ProductImageCarousel from "./ProductImageCarousel";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const FIELD_LIST = productFieldData;

const Product = ({ productInfo }: { productInfo: DocumentData }) => {
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfo).isSeller;
  const cartItems = useCartStore((state) => state.cartItems);
  const itemIndex = cartItems.indexOf(productInfo);
  const setAddToCart = useCartStore((state) => state.addToCart);
  const setIncreaseCartItem = useCartStore((state) => state.increaseCartItem);
  const [count, setCount] = useState(1);

  const handlePlusCounter = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCartItem = () => {
    if (isSeller !== false) {
      return;
    } else {
      if (!cartItems.includes(productInfo)) {
        setAddToCart(productInfo, count);
      } else {
        setIncreaseCartItem(itemIndex, count);
      }
    }
  };

  return (
    <div className="common-padding">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-80 flex">
          <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
            <div className="size-full flex justify-center items-center rounded-md">
              <ProductImageCarousel productImages={productInfo.productImages} />
            </div>
          </div>
          <div className="w-1/2 h-full pl-3 flex justify-center items-center">
            <div className="w-full h-full">
              {FIELD_LIST.map((ele, idx: number) => (
                <div
                  key={`productSchema_${idx}`}
                  className="w-full h-[12%] flex mb-2"
                >
                  <span className="w-1/4 flex justify-start">{ele.label}</span>
                  <span className="size-full flex justify-end">
                    {productInfo[ele.value]}
                  </span>
                </div>
              ))}
              <div className="w-full h-[12%] flex mb-2">
                <span className="w-1/4 flex justify-start">재고</span>
                <span className="size-full flex justify-end">
                  {productInfo.productQunatity}
                </span>
              </div>
              <hr className="border-2 my-4" />
              <div className="w-full flex justify-between mb-3 ">
                <span className="w-1/2 flex justify-start">수량</span>
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
              </div>
              <Button
                type="button"
                className="w-full mt-5"
                onClick={handleAddToCartItem}
              >
                장바구니 담기
              </Button>
            </div>
          </div>
        </div>
        <hr className="w-full border-2 my-4" />
        {"추천상품 보여주기"}
        <div className="w-full h-auto flex flex-col justify-center items-start">
          <span>설명</span>
          <div className="w-full h-auto bg-gray-100 mt-2 min-h-24 p-8 rounded-md overflow-auto break-words">
            {productInfo.productDescription}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
