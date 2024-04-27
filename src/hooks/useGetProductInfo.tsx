import { getSellerProductInfo } from "@/services/firebase/getFirebaseData";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetProductInfo = (productId: string) => {
  const [productInfo, setProductInfo] = useState<DocumentData>();

  useEffect(() => {
    const getProductInfo = async () => {
      const sellerProductInfo = await getSellerProductInfo(productId);
      setProductInfo(sellerProductInfo);
    };
    getProductInfo();
  }, [productId]);

  return { productInfo };
};

export default useGetProductInfo;
