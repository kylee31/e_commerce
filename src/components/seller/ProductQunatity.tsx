const ProductQunatity = ({ productQunatity }: { productQunatity: number }) => {
  return (
    <div className="w-full flex justify-between mb-3 ">
      <span className="w-1/3 flex justify-start">수량</span>
      <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
        -
      </div>
      <span className="mx-16">{productQunatity}</span>
      <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
        +
      </div>
    </div>
  );
};

export default ProductQunatity;
