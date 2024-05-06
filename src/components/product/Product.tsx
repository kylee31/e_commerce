import { productFieldData } from "@/services/data/ProductData";
import { DocumentData } from "firebase/firestore";
import ProductImageCarousel from "./ProductImageCarousel";
import { useAddToCartAction, useCartItemsState } from "@/stores/cartStore";
import { useState } from "react";
import convertKRW from "@/util/convertKRW";
import { ProductFieldDataType } from "@/types/ProductType";
import AddToCartItemButton from "./AddToCartItemButton";
import ProductQunatityCounter from "../common/ProductQunatityCounter";

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
                <ProductQunatityCounter
                  isEdit={true}
                  count={count}
                  setCount={setCount}
                  productInfo={productInfo}
                />
              </div>
              <AddToCartItemButton
                isIncludes={isIncludes}
                count={count}
                productInfo={productInfo}
                handleAddToCartItem={handleAddToCartItem}
              />
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
