import { TableCell, TableRow } from "../ui/table";
import Counter from "../common/Counter";

type dummyType = {
  productPrice: string;
  productName: string;
};

const InvoiceItem = ({ info }: { info: dummyType }) => {
  //const totalProductPrice = count * Number(info.productPrice);
  return (
    <TableRow>
      <TableCell>{info.productName}</TableCell>
      <TableCell>
        <Counter />
      </TableCell>
      <TableCell className="flex justify-between">
        {"총액"}
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
