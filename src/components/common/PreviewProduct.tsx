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
  viewRef,
}: {
  info: DocumentData | undefined;
  onClick: () => void;
  isVisible: boolean;
  viewRef?: (node?: Element | null | undefined) => void;
}) => {
  if (info == undefined) {
    return <></>;
  }

  return (
    <Card
      className="w-full h-full border-gray-300 flex flex-col justify-end"
      onClick={onClick}
      ref={viewRef}
    >
      <CardHeader className="h-full">
        <div className="h-full flex justify-center items-center">
          <img
            src={info.productImages[0]}
            alt=""
            className="border border-gray-300 rounded-md"
          />
        </div>
        <CardTitle>{info.productName}</CardTitle>
        <CardDescription>{info.productCategory}</CardDescription>
      </CardHeader>
      <CardContent className="">
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
