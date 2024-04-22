import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PreviewProduct = ({
  name,
  price,
  img,
  count,
  category,
  onClick,
}: {
  name: string;
  price: number;
  img: string[];
  count: number;
  category: string;
  onClick: () => void;
}) => {
  return (
    <>
      <Card className="w-full border-gray-300" onClick={onClick}>
        <CardHeader>
          <img
            src={img[0]}
            alt=""
            className="h-24 border border-gray-300 rounded-md"
          />
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-between border-b">
            <span>가격💸</span>
            {price}원
          </div>
          <div className="w-full flex justify-between border-b">
            <span>재고📦</span>
            {count}개
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default PreviewProduct;
