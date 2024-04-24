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
          src={info.productImages[0]}
          alt=""
          className="h-28 border border-gray-300 rounded-md"
        />
        <CardTitle>{info.productName}</CardTitle>
        <CardDescription>{info.productCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between border-b">
          <span>가격💸</span>
          {info.productPrice}원
        </div>
        {/*재고는 판매자한테만 보여주는 정보*/}
        <div className="w-full flex justify-between border-b">
          <span>재고📦</span>
          {info.productQunatity}개
        </div>
      </CardContent>
    </Card>
  );
};
export default PreviewProduct;
