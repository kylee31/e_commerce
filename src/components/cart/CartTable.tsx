import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceItem from "./InvoiceItem";
import { useCartItemsState } from "@/stores/cartStore";
import useCalcTotalPrice from "@/hooks/useCalcTotalPrice";
import convertKRW from "@/util/convertKRW";

const CartTable = ({
  isImage,
  className,
  isEditPossible,
}: {
  isImage?: boolean;
  className?: string;
  isEditPossible: boolean;
}) => {
  const cartItems = useCartItemsState();
  const totalPrice = useCalcTotalPrice();
  const productTotalPrice = convertKRW(totalPrice);
  return (
    <div className="w-full h-full overflow-y-auto">
      {cartItems.length > 0 ? (
        <Table className={className}>
          <TableHeader>
            <TableRow>
              <TableHead>상품명</TableHead>
              <TableHead>수량</TableHead>
              <TableHead>가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((info, idx) => (
              <InvoiceItem
                key={`invoiceItem_${idx}`}
                info={info}
                isImage={isImage}
                isEditPossible={isEditPossible}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>합계</TableCell>
              <TableCell>{productTotalPrice}</TableCell>
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
