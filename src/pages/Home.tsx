import CategoryCarousel from "@/components/category/CategoryCarousel";
import CategoryTag from "@/components/category/CategoryTag";
import PreviewCategory from "@/components/category/PreviewCategory";
import {
  ProductCategory,
  ProductCategoryInfo,
} from "@/services/data/ProductData";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
    };
    preventGoBack();
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center common-padding">
      <div>
        <CategoryCarousel info={ProductCategoryInfo} />
        <div className="w-full grid grid-flow-col gap-3 mb-10">
          {ProductCategory.map((tag: string, idx: number) => (
            <CategoryTag key={`cateTag_${idx}`} tag={tag} />
          ))}
        </div>
        <div className="w-full h-auto space-y-10">
          {ProductCategory.map((info, idx) => (
            <PreviewCategory key={`previewCategory_${idx}`} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
