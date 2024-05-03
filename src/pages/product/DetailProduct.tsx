import Product from "@/components/product/Product";
import RecommendedProduct from "@/components/product/RecommendedProduct";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const productId = useParams().id!;
  const { productInfo, productDocSnap } = useGetProductInfo(productId);
  const productCategory = productInfo ? productInfo.productCategory : "";

  if (
    productInfo === undefined ||
    productCategory === undefined ||
    productDocSnap === undefined
  ) {
    return <></>;
  }

  return (
    <div className="w-full">
      <Product productInfo={productInfo}>
        <RecommendedProduct
          productDocSnap={productDocSnap}
          productCategory={productCategory}
        />
      </Product>
    </div>
  );
};

export default DetailProduct;
