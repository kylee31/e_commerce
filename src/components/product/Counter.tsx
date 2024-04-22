import { useState } from "react";

//TODO: 재사용할 일 없어보임. 삭제해도 될 듯
const Counter = ({
  isEdit,
  getCount,
}: {
  isEdit: boolean;
  getCount?: number;
}) => {
  const [count, setCount] = useState(0);

  const handlePlusCounter = () => {
    if (isEdit && count < 100) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (isEdit && count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-full flex mb-3">
        <span className="w-1/3 flex justify-start">수량</span>
        <div
          onClick={handleMinusCounter}
          className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
        >
          -
        </div>
        <span className="mx-16">{isEdit ? count : getCount}</span>
        <div
          onClick={handlePlusCounter}
          className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Counter;
