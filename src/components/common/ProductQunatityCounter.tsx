import { DocumentData } from "firebase/firestore";

const ProductQunatityCounter = ({
  isEdit,
  count,
  setCount,
  productInfo,
  productQunatity,
}: {
  isEdit: boolean;
  count: number;
  setCount: (count: number) => void;
  productInfo?: DocumentData;
  productQunatity?: number;
}) => {
  const handlePlusCounter = () => {
    if (!productInfo) return;
    if (isEdit && count < 100 && productInfo.productQunatity > count) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (isEdit && count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="w-full flex justify-between mb-3 ">
      <div
        onClick={handleMinusCounter}
        className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
      >
        -
      </div>
      <span className="mx-16">{isEdit ? count : productQunatity}</span>
      <div
        onClick={handlePlusCounter}
        className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
      >
        +
      </div>
    </div>
  );
};

export default ProductQunatityCounter;
