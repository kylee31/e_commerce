import { useState } from "react";

//TODO: 재사용할 일 없어보임. 삭제해도 될 듯
const Counter = ({
  isEdit,
  quantity,
  getCount,
}: {
  isEdit: boolean;
  quantity: number;
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
    <div className="w-full flex justify-between items-center">
      <div
        onClick={handleMinusCounter}
        className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
      >
        -
      </div>
      <span>{isEdit ? quantity : getCount}</span>
      <div
        onClick={handlePlusCounter}
        className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl"
      >
        +
      </div>
    </div>
  );
};

export default Counter;
