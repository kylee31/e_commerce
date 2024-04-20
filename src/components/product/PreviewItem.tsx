const PreviewItem = ({
  name,
  price,
  img,
}: {
  name: string;
  price: number;
  img: string[];
}) => {
  return (
    <div className="h-48 border-2">
      {/*TODO:이미지 수정하기
      <img src={img[0]} alt="" />
      */}
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
};
export default PreviewItem;
