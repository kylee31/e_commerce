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
import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfoType } from "@/types/UserType";
import AlertAnswer from "../common/AlertAnswer";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartItemsState } from "@/stores/cartStore";

const CartList = () => {
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfoType).isSeller;
  const answer =
    isSeller === true
      ? "구매자 계정으로 로그인해주세요"
      : "로그인 후 이용해주세요";
  const userNickname = (userInfo as UserInfoType).nickname;
  const cartItems = useCartItemsState();
  const location = useLocation();
  const isOrderPage = location.pathname.split("/")[2] === "order-sheet";
  const navigate = useNavigate();

  const handleClickOrderButton = () => {
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
            <img
              src="/imgs/cart.webp"
              alt=""
              className="hover:cursor-pointer"
            />
          </div>
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col justify-center">
          <SheetHeader className="flex flex-col justify-center items-center">
            <SheetTitle>
              {(userInfo as UserInfoType).isSeller === false &&
                userNickname + "님 "}
              장바구니
            </SheetTitle>
            <SheetDescription>상품 목록</SheetDescription>
          </SheetHeader>
          <div className="w-full h-96">
            <CartTable isEditPossible={isOrderPage ? false : true} />
          </div>
          <SheetFooter>
            <SheetClose asChild className="w-full">
              {isSeller === false ? (
                <Button
                  type="button"
                  onClick={handleClickOrderButton}
                  className={`${
                    cartItems.length === 0 ? "invisible" : "visible"
                  }`}
                >
                  주문하기
                </Button>
              ) : (
                <AlertAnswer
                  answer={answer}
                  trueButton="로그인 하러가기"
                  falseButton="취소"
                  onTrueClick={handleClickOrderButton}
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
