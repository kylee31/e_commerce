import CartList from "@/components/cart/CartList";
const StickyCart = () => {
  return (
    <div className="fixed bottom-10 right-10 p-3 bg-gray-400 rounded-full">
      <div className="relative">
        <CartList />
      </div>
      <div className="absolute top-0 right-0">0</div>
    </div>
  );
};

export default StickyCart;
