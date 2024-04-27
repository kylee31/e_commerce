import CartTable from "@/components/cart/CartTable";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const CartList = () => {
  const userInfo = useUserInfo();
  const userNickname = (userInfo as UserInfo).nickname;
  return (
    <div className="w-full h-full relative flex justify-end">
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            <img src="/imgs/cart.png" alt="" className="hover:cursor-pointer" />
          </div>
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col justify-center">
          <SheetHeader className="flex flex-col justify-center items-center">
            <SheetTitle>{userNickname}님 장바구니</SheetTitle>
            <SheetDescription>상품 목록</SheetDescription>
          </SheetHeader>
          <div className="w-full h-96 flex justify-center items-center">
            <CartTable />
          </div>
          <SheetFooter className="">
            <SheetClose asChild className="w-full">
              <Button type="submit" onClick={() => {}}>
                주문하기
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartList;
