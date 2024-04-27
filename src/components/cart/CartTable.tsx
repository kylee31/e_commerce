import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceItem from "./InvoiceItem";

//TODO: 수량 어떻게?
const dummy: dummyType[] = [
  {
    productPrice: "2800",
    productName: "상품명",
  },
  {
    productPrice: "540000",
    productName: "상품명2",
  },
];
type dummyType = {
  productPrice: string;
  productName: string;
};

const CartTable = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {dummy.length > 0 ? (
        <Table>
          <TableCaption>장바구니에 담은 상품 목록입니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>상품명</TableHead>
              <TableHead>수량</TableHead>
              <TableHead>가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummy.map((info, idx) => (
              <InvoiceItem key={`invoiceItem_${idx}`} info={info} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>합계</TableCell>
              <TableCell>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          장바구니에 상품이 없습니다!
        </div>
      )}
    </div>
  );
};
export default CartTable;
