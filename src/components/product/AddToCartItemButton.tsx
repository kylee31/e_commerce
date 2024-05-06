import { DocumentData } from "firebase/firestore";
import AlertAnswer from "../common/AlertAnswer";
import { Button } from "../ui/button";

const AddToCartItemButton = ({
  isIncludes,
  count,
  productInfo,
  handleAddToCartItem,
}: {
  isIncludes: boolean;
  count: number;
  productInfo: DocumentData;
  handleAddToCartItem: () => void;
}) => {
  if (isIncludes) {
    return (
      <AlertAnswer
        answer="이미 담겨있는 상품입니다. 장바구니에서 수량을 변경해주세요"
        trueButton="확인"
        falseButton="취소"
        onTrueClick={handleAddToCartItem}
      >
        <Button type="button" className="w-full mt-5">
          장바구니 담기
        </Button>
      </AlertAnswer>
    );
  }
  if (count <= productInfo.productQunatity) {
    return (
      <AlertAnswer
        answer={`${count}개의 상품을 장바구니에 담을까요?`}
        trueButton="확인"
        falseButton="취소"
        onTrueClick={handleAddToCartItem}
      >
        <Button type="button" className="w-full mt-5">
          장바구니 담기
        </Button>
      </AlertAnswer>
    );
  }
  return (
    <AlertAnswer
      answer="품절된 상품입니다!"
      trueButton="확인"
      falseButton="취소"
      onTrueClick={handleAddToCartItem}
    >
      <Button type="button" className="w-full mt-5">
        장바구니 담기
      </Button>
    </AlertAnswer>
  );
};

export default AddToCartItemButton;
