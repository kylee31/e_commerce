import Product from "@/components/product/Product";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const productId = useParams().id!;
  const { productInfo } = useGetProductInfo(productId);

  if (productInfo == undefined) {
    return <></>;
  }

  return <Product productInfo={productInfo} />;
};

export default DetailProduct;
