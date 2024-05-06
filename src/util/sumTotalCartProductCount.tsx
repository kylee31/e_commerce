const sumTotalCartProductCount = (cartItemsCount: number[]) => {
  let totalCount = 0;
  if (cartItemsCount.length > 0) {
    totalCount = cartItemsCount.reduce((result, num) => (result += num));
  }
  return totalCount;
};

export default sumTotalCartProductCount;
