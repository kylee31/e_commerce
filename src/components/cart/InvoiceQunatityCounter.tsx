import { DocumentData } from "firebase/firestore";

const InvoiceQunatityCounter = ({
  isEdit,
  isOutOfStock,
  count,
  info,
  setCount,
}: {
  isEdit: boolean;
  isOutOfStock: boolean;
  count: number;
  info: DocumentData;
  setCount: (count: number) => void;
}) => {
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

  return (
    <>
      {isEdit && (
        <div
          onClick={handleMinusCounter}
          className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
        >
          -
        </div>
      )}
      <span>
        {!isOutOfStock ? (
          `${count}개`
        ) : (
          <span className="text-red-400">재고 부족</span>
        )}
      </span>
      {isEdit && (
        <div
          onClick={handlePlusCounter}
          className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
        >
          +
        </div>
      )}
    </>
  );
};

export default InvoiceQunatityCounter;
