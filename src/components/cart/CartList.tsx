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
import AlertAnswer from "../common/AlertAnswer";
import { useNavigate } from "react-router-dom";
import { useCartItemsState } from "@/stores/cartStore";

const CartList = () => {
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfo).isSeller;
  const userNickname = (userInfo as UserInfo).nickname;
  const cartItems = useCartItemsState();
  const navigate = useNavigate();

  const handleOrderProducts = () => {
    if (isSeller === true) {
      navigate("/login");
    } else if (isSeller === false) {
      navigate("/buyer");
    } else {
      navigate("/login");
    }
  };
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
            <SheetTitle>
              {(userInfo as UserInfo).isSeller === false &&
                userNickname + "님 "}
              장바구니
            </SheetTitle>
            <SheetDescription>상품 목록</SheetDescription>
          </SheetHeader>
          <div className="w-full h-96 flex justify-center items-center">
            <CartTable />
          </div>
          <SheetFooter className="">
            <SheetClose asChild className="w-full">
              {isSeller === false ? (
                <Button
                  type="button"
                  onClick={handleOrderProducts}
                  className={`${
                    cartItems.length === 0 ? "invisible" : "visible"
                  }`}
                >
                  주문하기
                </Button>
              ) : isSeller === true ? (
                <AlertAnswer
                  answer="구매자 계정으로 로그인해주세요"
                  trueButton="로그인 하러가기"
                  falseButton="취소"
                  onTrueClick={handleOrderProducts}
                  className="w-full"
                >
                  <Button
                    type="button"
                    className={`${
                      cartItems.length === 0 ? "invisible" : "visible"
                    }`}
                  >
                    주문하기
                  </Button>
                </AlertAnswer>
              ) : (
                <AlertAnswer
                  answer="로그인 후 이용해주세요"
                  trueButton="로그인 하러가기"
                  falseButton="취소"
                  onTrueClick={handleOrderProducts}
                  className="w-full"
                >
                  <Button
                    type="button"
                    className={`${
                      cartItems.length === 0 ? "invisible" : "visible"
                    }`}
                  >
                    주문하기
                  </Button>
                </AlertAnswer>
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartList;
