import { getRecommendedProducts } from "@/services/productService";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetRecommendedProduct = ({
  productDocSnap,
  productCategory,
}: {
  productDocSnap: DocumentData;
  productCategory: string;
}) => {
  const [recommendedProduct, setRecommendedProduct] = useState<DocumentData[]>(
    []
  );

  useEffect(() => {
    const recommendedProduct = async () => {
      const data = await getRecommendedProducts({
        productCategory,
        productDocSnap,
      });
      setRecommendedProduct(data);
    };
    recommendedProduct();
  }, [productDocSnap, productCategory]);

  return { recommendedProduct };
};

export default useGetRecommendedProduct;
