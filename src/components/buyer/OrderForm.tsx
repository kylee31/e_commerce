import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import CartTable from "@/components/cart/CartTable";
import { OrderFormInputData } from "@/services/data/OrderData";
import { useForm } from "react-hook-form";
import { db } from "@/firebase";
import { CartItemsType } from "@/types/CartType";
import {
  DocumentData,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@/services/UserProvider";
import {
  useCartItemsCountState,
  useCartItemsState,
  useClearToCartAction,
} from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import useCalcTotalPrice from "@/hooks/useCalcTotalPrice";

declare global {
  interface Window {
    IMP: any;
  }
}

const INPUT_LIST = OrderFormInputData;
const IMP_CODE = import.meta.env.VITE_APP_IMP_CODE;

const OrderForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userId = useUser();
  const nowDate = new Date();
  const totalPrice = useCalcTotalPrice();
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();
  const setClearToCart = useClearToCartAction();

  const callback = async (response: any) => {
    const { success, merchant_uid, error_msg } = response;
    if (success) {
      cartItems.forEach(async (item: DocumentData, idx) => {
        if (userId) {
          const cartItemsRef = doc(collection(db, "order"));
          const cartItemsId = cartItemsRef.id;
          const buyerCartItems: CartItemsType = {
            merchantUid: merchant_uid,
            id: cartItemsId,
            sellerId: item.sellerId,
            buyerId: userId,
            productId: item.id,
            productName: item.productName,
            productTotalPrice: item.productPrice * cartItemsCount[idx],
            productQunatity: cartItemsCount[idx],
            Status: "PROCESSING",
            createdAt: nowDate,
            updatedAt: nowDate,
          };
          await setDoc(cartItemsRef, buyerCartItems);
        }
      });
      await setClearToCart();
      await navigate("/buyer/order-list");
    } else {
      alert(`결제 오류: ${error_msg}`);
    }
  };

  const onPaymentSubmit = (orderDatas: any) => {
    const { buyerEmail, receiverName, receiverPhoneNumber, address } =
      orderDatas;
    const { IMP } = window;
    IMP.init(IMP_CODE);

    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: totalPrice, // 결제금액
      name: "아임포트 결제", // 주문명
      buyer_email: buyerEmail, // 구매자 이메일
      buyer_name: receiverName, // 구매자 이름
      buyer_tel: receiverPhoneNumber, // 구매자 전화번호
      buyer_addr: address, // 구매자 주소
    };

    IMP.request_pay(data, callback);

    cartItems.forEach((item: DocumentData, idx: number) => {
      const productRef = doc(db, "product", item.id);
      updateDoc(productRef, {
        productQunatity: item.productQunatity - cartItemsCount[idx],
      });
    });
  };

  return (
    <>
      <div className="flex">
        <div className="w-2/3 pr-7">
          <form id="orderForm" onSubmit={handleSubmit(onPaymentSubmit)}>
            <div>
              <div className="text-lg font-extrabold flex flex-col items-start mb-2">
                1. 주문자 정보
              </div>
              <div className="w-full">
                {INPUT_LIST.slice(0, 3).map((ele, idx) => (
                  <div key={`orderFormInputData_${idx}`}>
                    <Label className="flex justify-start items-center">
                      {ele.label}
                    </Label>
                    <Input
                      type={ele.type}
                      placeholder={ele.placeholder}
                      className="w-full border-gray-500 border rounded-sm"
                      {...register(ele.value, ele.register)}
                    />
                    {errors[ele.value] && (
                      <div className="text-red-400 text-xs mt-1">
                        {errors[ele.value]?.message?.toString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="text-lg font-extrabold flex flex-col items-start mb-2">
                2. 배송지 정보
              </div>
              <div className="w-full">
                {INPUT_LIST.slice(3).map((ele, idx) => (
                  <div key={`orderFormInputData_${idx}`}>
                    <Label className="flex justify-start items-center">
                      {ele.label}
                    </Label>
                    <Input
                      type={ele.type}
                      placeholder={ele.placeholder}
                      className="w-full border-gray-500 border rounded-sm"
                      {...register(ele.value, ele.register)}
                    />
                    {errors[ele.value] && (
                      <div className="text-red-400 text-xs mt-1">
                        {errors[ele.value]?.message?.toString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex flex-col items-start">
          <div className="w-full text-lg font-extrabold flex justify-start">
            3. 상품 리스트
          </div>
          <CartTable
            isEditPossible={false}
            className="border-gray-500 border mt-5"
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6" form="orderForm">
        결제하기
      </Button>
    </>
  );
};

export default OrderForm;
