import { useUser } from "@/services/context/UserProvider";
import {
  useCartItemsCountState,
  useCartItemsState,
  useClearToCartAction,
} from "@/services/stores/cartStore";
import { useNavigate } from "react-router-dom";
import calcTotalPrice from "@/util/calcTotalPrice";
import {
  cancleBuyerPaymentProcess,
  postFirebaseOrderItems,
  updateFirebaseOrderItemsCount,
} from "@/services/orderService";

const IMP_CODE = import.meta.env.VITE_APP_IMP_CODE;
const useOrderPayment = () => {
  const cartItems = useCartItemsState();
  const cartItemsCount = useCartItemsCountState();

  const navigate = useNavigate();
  const userId = useUser();
  const totalPrice = calcTotalPrice(cartItems, cartItemsCount);
  const setClearToCart = useClearToCartAction();

  const callback = async (response: any) => {
    const { success, merchant_uid, error_msg } = response;
    if (success) {
      if (!userId) return;
      await postFirebaseOrderItems({
        cartItems,
        cartItemsCount,
        userId,
        merchant_uid,
      });
      await setClearToCart();
      await navigate("/buyer/order-list");
    } else {
      cancleBuyerPaymentProcess({ cartItems });
      alert(`결제 오류: ${error_msg}`);
    }
  };

  const onPaymentSubmit = async (orderDatas: any) => {
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
    const isSoldOut = await updateFirebaseOrderItemsCount({
      cartItems,
      cartItemsCount,
    });
    if (isSoldOut) {
      //TODO: alert 수정 alert창이 닫힌 후 navigate이 실행되어야 하는데 그렇지 않음, 수정 필요
      alert("재고 부족 상품이 존재합니다");
      setTimeout(() => navigate("/buyer"), 0);
    } else {
      IMP.request_pay(data, callback);
    }
  };
  return { onPaymentSubmit };
};

export default useOrderPayment;
