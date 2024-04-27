import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";

type dummyType = {
  productPrice: string;
  productName: string;
};

const InvoiceItem = ({ info }: { info: dummyType }) => {
  const [count, setCount] = useState(1);
  const totalProductPrice = count * Number(info.productPrice);
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
    <TableRow>
      <TableCell>{info.productName}</TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell className="flex justify-between">
        {totalProductPrice}
        <div
          className="bg-black rounded-full text-white size-5 flex justify-center items-center hover:cursor-pointer"
          onClick={() => {}}
        >
          x
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
