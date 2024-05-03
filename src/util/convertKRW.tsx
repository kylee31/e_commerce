const convertKRW = (price: number) => {
  const convertPrice = price.toLocaleString("ko-KR", {
    maximumFractionDigits: 4,
  });
  return convertPrice;
};

export default convertKRW;
