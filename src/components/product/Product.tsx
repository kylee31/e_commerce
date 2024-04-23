import { useSellerProduct } from "@/services/SellerProductProvider";
import { productFieldData } from "@/services/data/ProductData";

const FIELD_LIST = productFieldData;

const Product = ({ idx }: { idx: number }) => {
  const sellerProduct = useSellerProduct();
  const productInfo = sellerProduct[idx];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-64 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
          <div className="size-full flex justify-between rounded-md">
            <img
              key={`productimgs_${0}`}
              src={productInfo.imgs[0]}
              alt=""
              className="border-2 w-72 rounded-md"
            />
            <div className="w-32 h-full">
              {productInfo.imgs.slice(1).map((url: string, idx: number) => {
                return (
                  <img
                    key={`productimgs_${idx + 1}`}
                    src={url}
                    alt=""
                    className="w-full h-1/3 border-2 rounded-md"
                    width={100}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/*오른쪽*/}
        <div className="w-1/2 h-full pl-3 flex justify-center items-center">
          <div className="w-full h-full">
            {FIELD_LIST.map((ele, idx) => {
              return (
                <div
                  key={`productSchema_${idx}`}
                  className="w-full h-1/5 flex mb-2"
                >
                  <span className="w-1/3 flex justify-start">{ele.label}</span>
                  <span className="size-full flex justify-end">
                    {productInfo[ele.value]}
                  </span>
                </div>
              );
            })}
            <hr className="border-2 my-4" />
            <div className="w-full flex justify-between mb-3 ">
              <span className="w-1/3 flex justify-start">수량</span>
              <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
                -
              </div>
              <span className="mx-16">{productInfo.count}</span>
              <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-2 my-4" />
      <div className="w-full h-auto flex flex-col justify-center items-start">
        <span>설명</span>
        <div className="w-full h-auto bg-gray-100 mt-2 min-h-24 p-8 rounded-md overflow-auto break-words">
          {productInfo.description}
        </div>
      </div>
    </div>
  );
};
export default Product;
