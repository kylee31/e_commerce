import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handlePlusCounter = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 0) {
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
        <span className="mx-16">{count}</span>
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
