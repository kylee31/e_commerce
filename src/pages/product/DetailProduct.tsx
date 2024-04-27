import ProductItem from "@/components/category/ProductItem";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const productId = useParams().id!;
  const { productInfo } = useGetProductInfo(productId);

  if (productInfo == undefined) {
    return <></>;
  }

  return (
    <div className="common-padding">
      <ProductItem productInfo={productInfo} />
    </div>
  );
};

export default DetailProduct;
