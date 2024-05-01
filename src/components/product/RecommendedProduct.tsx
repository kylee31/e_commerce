import { DocumentData } from "firebase/firestore";
import PreviewProduct from "../common/PreviewProduct";
import useGetRecommendedProduct from "@/hooks/useGetRecommendedProduct";
import { useNavigate } from "react-router-dom";

const RecommendedProduct = ({
  productDocSnap,
  productCategory,
}: {
  productDocSnap: DocumentData;
  productCategory: string;
}) => {
  const { recommendedProduct } = useGetRecommendedProduct({
    productDocSnap,
    productCategory,
  });
  const navigate = useNavigate();

  if (productCategory === undefined || recommendedProduct.length < 1) {
    return <></>;
  }

  const handleClickProduct = (idx: number) => {
    if (recommendedProduct) {
      navigate(
        `/category/${decodeURI(productCategory)}/${recommendedProduct[idx].id}`
      );
    }
  };

  return (
    <div className="flex flex-col items-start mb-5">
      <div>추천상품</div>
      <div className="grid grid-flow-col col-span-4 gap-5">
        {recommendedProduct?.map((data, idx) => (
          <PreviewProduct
            key={`recommendedProduct_${idx}`}
            info={data}
            onClick={() => handleClickProduct(idx)}
            isVisible={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
