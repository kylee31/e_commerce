import { getSellerProductInfo } from "@/services/getFirebaseService";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetProductInfo = (productId: string) => {
  const [productInfo, setProductInfo] = useState<DocumentData>();
  const [productDocSnap, setProductDocSnap] = useState<DocumentData>();

  useEffect(() => {
    const getProductInfo = async () => {
      const { docData, docSnap } = await getSellerProductInfo(productId);
      setProductInfo(docData);
      setProductDocSnap(docSnap);
    };
    getProductInfo();
  }, [productId]);

  return { productInfo, productDocSnap };
};

export default useGetProductInfo;
