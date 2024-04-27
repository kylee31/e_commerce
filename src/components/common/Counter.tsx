import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(1);

  const handlePlusCounter = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };
  const handleMinusCounter = () => {
    if (count > 1) {
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
      <span>{count}</span>
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
