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
  isVisible,
}: {
  info: DocumentData;
  onClick: () => void;
  isVisible: boolean;
}) => {
  return (
    <Card className="w-full border-gray-300" onClick={onClick}>
      <CardHeader>
        <img
          src={info.productImages[0]}
          alt=""
          className="border border-gray-300 rounded-md"
        />
        <CardTitle>{info.productName}</CardTitle>
        <CardDescription>{info.productCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between border-b">
          <span>가격💸</span>
          {info.productPrice}원
        </div>
        {isVisible && (
          <div className="w-full flex justify-between border-b">
            <span>재고📦</span>
            {info.productQunatity}개
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default PreviewProduct;
