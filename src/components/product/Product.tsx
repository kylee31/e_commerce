import { productFieldData } from "@/services/data/ProductData";
import { DocumentData } from "firebase/firestore";
import ProductImageCarousel from "./ProductImageCarousel";
import { Button } from "../ui/button";
import { useAddToCartAction, useCartItemsState } from "@/stores/cartStore";
import { useState } from "react";
import AlertAnswer from "../common/AlertAnswer";
import convertKRW from "@/util/convertKRW";
import { ProductFieldDataType } from "@/types/ProductType";

const FIELD_LIST = productFieldData;

const Product = ({
  productInfo,
  children,
}: {
  productInfo: DocumentData;
  children?: React.ReactNode;
}) => {
  const productPrice = convertKRW(productInfo.productPrice);
  const cartItems = useCartItemsState();
  const isIncludes = cartItems.some(
    (item: DocumentData) => item.id === productInfo.id
  );
  const setAddToCart = useAddToCartAction();
  const [count, setCount] = useState(1);

  const handlePlusCounter = () => {
    if (count < 100 && productInfo.productQunatity > count) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCartItem = () => {
    if (!isIncludes && count <= productInfo.productQunatity) {
      setAddToCart(productInfo, count);
    }
    setCount(1);
  };

  return (
    <div className="common-padding ">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-80 flex">
          <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
            <div className="size-full flex justify-center items-center rounded-md">
              <ProductImageCarousel productImages={productInfo.productImages} />
            </div>
          </div>
          <div className="w-1/2 h-full pl-3 flex justify-center items-center">
            <div className="w-full h-full">
              {FIELD_LIST.map((ele: ProductFieldDataType, idx) => (
                <div
                  key={`productSchema_${idx}`}
                  className="w-full h-[12%] flex mb-2"
                >
                  <span className="w-1/4 flex justify-start">{ele.label}</span>
                  <span className="size-full flex justify-end">
                    {ele.value === "productPrice"
                      ? productPrice
                      : productInfo[ele.value]}
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
              {isIncludes ? (
                <AlertAnswer
                  answer="이미 담겨있는 상품입니다. 장바구니에서 수량을 변경해주세요"
                  trueButton="확인"
                  falseButton="취소"
                  onTrueClick={handleAddToCartItem}
                >
                  <Button type="button" className="w-full mt-5">
                    장바구니 담기
                  </Button>
                </AlertAnswer>
              ) : count <= productInfo.productQunatity ? (
                <AlertAnswer
                  answer={`${count}개의 상품을 장바구니에 담을까요?`}
                  trueButton="확인"
                  falseButton="취소"
                  onTrueClick={handleAddToCartItem}
                >
                  <Button type="button" className="w-full mt-5">
                    장바구니 담기
                  </Button>
                </AlertAnswer>
              ) : (
                <AlertAnswer
                  answer="품절된 상품입니다!"
                  trueButton="확인"
                  falseButton="취소"
                  onTrueClick={handleAddToCartItem}
                >
                  <Button type="button" className="w-full mt-5">
                    장바구니 담기
                  </Button>
                </AlertAnswer>
              )}
            </div>
          </div>
        </div>
        <hr className="w-full border-2 my-4" />
        {children}
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
