import CartList from "@/components/cart/CartList";
import { useCartItemsCountState } from "@/stores/cartStore";
import sumTotalCartProductCount from "@/util/sumTotalCartProductCount";

const StickyCart = () => {
  const cartItemsCount = useCartItemsCountState();
  const totalCount = sumTotalCartProductCount(cartItemsCount);

  return (
    <div className="fixed bottom-10 right-10 p-3 bg-gray-400 rounded-full">
      <div className="relative">
        <CartList />
      </div>
      <div className="absolute top-0 right-0">{totalCount}</div>
    </div>
  );
};

export default StickyCart;
