import CategoryCarousel from "@/components/category/CategoryCarousel";
import CategoryTag from "@/components/category/CategoryTag";
import PreviewCategory from "@/components/home/PreviewCategory";
import {
  ProductCategory,
  ProductCategoryInfo,
} from "@/services/data/ProductData";
import { useEffect } from "react";

const PRODUCT_CATEGORY_WITH_URL = ProductCategoryInfo;
const PRODUCT_CATEGORY = ProductCategory;

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
        <CategoryCarousel category={PRODUCT_CATEGORY_WITH_URL} />
        <div className="w-full grid grid-flow-col gap-3 mb-10">
          <div>final</div>
          {PRODUCT_CATEGORY.map((tag: string, idx) => (
            <CategoryTag key={`categoryTag_${idx}`} tag={tag} />
          ))}
        </div>
        <div className="w-full h-auto space-y-10">
          {PRODUCT_CATEGORY.map((info: string, idx) => (
            <PreviewCategory key={`previewCategory_${idx}`} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
