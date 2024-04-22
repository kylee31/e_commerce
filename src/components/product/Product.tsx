import { useSellerProduct } from "@/services/SellerProductProvider";

const Product = ({ idx }: { idx: number }) => {
  const sellerProduct = useSellerProduct();
  const productInfo = sellerProduct[idx];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-2/3 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center p-3 ">
          <div className="w-full h-32 flex border-2">
            {productInfo.imgs.map((url: string, idx: number) => {
              return (
                <img
                  key={`productimgs_${idx}`}
                  src={url}
                  alt=""
                  className="border-2"
                  width={80}
                  height={80}
                />
              );
            })}
          </div>
        </div>
        {/*오른쪽*/}
        <div className="w-1/2 h-full p-3  flex justify-center items-center">
          <div className="w-full">
            <div className="w-full flex mb-3">
              <span className="w-1/3 flex justify-start">상품명</span>
              <span>{productInfo.name}</span>
            </div>
            <div className="w-full flex mb-3">
              <span className="w-1/3 flex justify-start">카테고리</span>
              <span>{productInfo.category}</span>
            </div>
            <div className="w-full flex mb-3">
              <span className="w-1/3 flex justify-start">가격</span>
              <span>{productInfo.price}</span>
            </div>
            <hr className="border-2 my-4" />
            <div className="w-full flex mb-3">
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
      <hr className="border-2 my-4" />
      <div className="w-full h-1/3 flex justify-center items-center ">
        <div className="w-full h-full flex flex-col justify-center items-start mb-3">
          <span>설명</span>
          <div className="w-full h-1/2 border-gray-500 border mt-3 resize-none">
            {productInfo.description}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
