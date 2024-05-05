import CategorySortedBar from "@/components/category/CategorySortedBar";
import PreviewProduct from "@/components/common/PreviewProduct";
import useInfiniteFetching from "@/hooks/useInfiniteFetching";
import { ProductInfiniteFetchingType } from "@/types/ProductType";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const categoryId = useParams().cate!;
  const [sortedType, setSortedType] = useState("updatedAt");
  const { datas: categoryInfo, viewRef } = useInfiniteFetching({
    getQueryKey: "categoryProducts",
    type: "category",
    cate: categoryId,
    sortedType,
    docLength: 10,
  });
  const navigate = useNavigate();

  const handleSortProduct = (cate: string) => {
    setSortedType(cate);
  };

  const handleClickProduct = (idx: number) => {
    if (!categoryInfo) return;

    const productId = categoryInfo[idx].id;
    navigate(`/category/${categoryId}/${productId}`);
  };

  if (!categoryInfo) {
    return <></>;
  }

  return (
    <div className="w-full common-padding">
      <div className="font-extrabold text-3xl mb-10">{categoryId}</div>
      <div className="w-full h-10 border-2 mb-8 flex justify-start items-center">
        <CategorySortedBar handleSortProduct={handleSortProduct} />
      </div>
      {categoryInfo.length > 0 ? (
        <div className="w-full grid grid-flow-row grid-cols-5 gap-5">
          {categoryInfo.map((info: ProductInfiniteFetchingType, idx) => (
            <PreviewProduct
              key={`productPreviewProduct_${idx}`}
              info={info}
              isVisible={false}
              onClick={() => handleClickProduct(idx)}
              viewRef={viewRef}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center">
          등록된 상품이 없습니다😥
        </div>
      )}
    </div>
  );
};
export default Category;
