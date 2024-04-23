import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DocumentData } from "firebase/firestore";

const PreviewProduct = ({
  info,
  onClick,
}: {
  info: DocumentData;
  onClick: () => void;
}) => {
  return (
    <Card className="w-full border-gray-300" onClick={onClick}>
      <CardHeader>
        <img
          src={info.imgs[0]}
          alt=""
          className="h-28 border border-gray-300 rounded-md"
        />
        <CardTitle>{info.name}</CardTitle>
        <CardDescription>{info.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between border-b">
          <span>가격💸</span>
          {info.price}원
        </div>
        <div className="w-full flex justify-between border-b">
          <span>재고📦</span>
          {info.count}개
        </div>
      </CardContent>
    </Card>
  );
};
export default PreviewProduct;
