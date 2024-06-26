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
    let isMount = true;

    const recommendedProduct = async () => {
      try {
        const data = await getRecommendedProducts({
          productCategory,
          productDocSnap,
        });
        if (isMount) {
          setRecommendedProduct(data);
        }
      } catch (error) {
        console.log("error fetching recommended products: ", error);
      }
    };
    recommendedProduct();

    return () => {
      isMount = false;
    };
  }, [productDocSnap, productCategory]);

  return { recommendedProduct };
};

export default useGetRecommendedProduct;
