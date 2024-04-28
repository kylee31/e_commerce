import CartList from "@/components/cart/CartList";
import { useCartStore } from "@/stores/cartStore";
const StickyCart = () => {
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);
  const totalCount =
    cartItemsCount.length === 0
      ? 0
      : cartItemsCount.reduce((result, num) => (result += num));
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
