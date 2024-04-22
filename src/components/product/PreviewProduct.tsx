const PreviewProduct = ({
  name,
  price,
  img,
  onClick,
}: {
  name: string;
  price: number;
  img: string[];
  onClick: () => void;
}) => {
  return (
    <div
      className="h-48 flex flex-col justify-center items-center border-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={img[0]} alt="" width={80} height={80} />
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
};
export default PreviewProduct;
