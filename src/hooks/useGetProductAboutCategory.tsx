import { getProductAboutCategory } from "@/services/getFirebaseService";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetProductAboutCategory = (info: string) => {
  const [categoryInfo, setCategoryInfo] = useState<DocumentData>();

  useEffect(() => {
    const getCategoryInfo = async () => {
      const productAboutCategory = await getProductAboutCategory(info);
      setCategoryInfo(productAboutCategory.slice(0, 4));
    };
    getCategoryInfo();
  }, [info]);
  return { categoryInfo };
};

export default useGetProductAboutCategory;
