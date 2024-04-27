import CategoryCarousel from "@/components/home/CategoryCarousel";
import CategoryTag from "@/components/home/CategoryTag";
import PreviewCategory from "@/components/home/PreviewCategory";
import {
  ProductCategory,
  ProductCategoryInfo,
} from "@/services/data/ProductData";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const preventGoBack = () => {
      //pushState(state, unused(원래는 title), url)
      history.pushState(null, "", location.href);
    };
    preventGoBack();
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-4/5">
        <CategoryCarousel info={ProductCategoryInfo} />
        <div className="w-full grid grid-flow-col gap-3 mb-10">
          {ProductCategory.map((tag: string, idx: number) => {
            return <CategoryTag key={`cateTag_${idx}`} tag={tag} />;
          })}
        </div>
        <div className="w-full h-auto space-y-10">
          <PreviewCategory info={{ cate: "dd", url: "dd" }} />
          <PreviewCategory info={{ cate: "dd", url: "dd" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
