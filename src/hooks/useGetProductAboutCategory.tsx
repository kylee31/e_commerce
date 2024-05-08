import { getProductAboutCategorySnap } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

const useGetProductAboutCategory = (info: string) => {
  const { data: categoryInfo, isLoading } = useQuery({
    queryKey: ["PreviewProductAboutCategory", info],
    queryFn: async () => {
      const productAboutCategory = await getProductAboutCategorySnap(info);
      const productAboutCategoryData = productAboutCategory.docs.map((doc) =>
        doc.data()
      );
      return productAboutCategoryData;
    },
    refetchOnWindowFocus: false,
  });

  return { categoryInfo, isLoading };
};

export default useGetProductAboutCategory;
