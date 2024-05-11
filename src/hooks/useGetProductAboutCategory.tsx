import { getProductAboutCategorySnap } from "@/services/productService";
import {
  usePreviewProductEnabledAction,
  usePreviewProductEnabledState,
} from "@/services/stores/productEnableStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetProductAboutCategory = (info: string) => {
  const isPreviewProductEnable = usePreviewProductEnabledState();
  const setPreviewProductEnabled = usePreviewProductEnabledAction();

  const { data: categoryInfo, isLoading } = useQuery({
    queryKey: ["PreviewProductAboutCategory", info],
    queryFn: async () => {
      const productAboutCategory = await getProductAboutCategorySnap(info);
      const productAboutCategoryData = productAboutCategory.docs.map((doc) =>
        doc.data()
      );
      return productAboutCategoryData;
    },
    enabled: isPreviewProductEnable,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isPreviewProductEnable) {
      setPreviewProductEnabled(false);
    }
  }, [isPreviewProductEnable, setPreviewProductEnabled]);

  return { categoryInfo, isLoading };
};

export default useGetProductAboutCategory;
