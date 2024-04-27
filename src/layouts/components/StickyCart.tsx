import CartList from "@/components/cart/CartList";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const StickyCart = () => {
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfo).isSeller;

  return (
    <div
      className={`fixed bottom-10 right-10 p-3 bg-gray-400 rounded-full ${
        isSeller ? "hidden" : "none"
      }`}
    >
      <div className="relative">
        <CartList />
      </div>
      <div className="absolute top-0 right-0">0</div>
    </div>
  );
};

export default StickyCart;
