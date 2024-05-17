import CategorySortedBar from "@/components/category/CategorySortedBar";
import PreviewProduct from "@/components/common/PreviewProduct";
import useInfiniteFetching from "@/hooks/useInfiniteFetching";
import { useCategoryProductEnabledAction } from "@/services/stores/productEnableStore";
import { ProductInfiniteFetchingType } from "@/types/ProductType";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const setCategoryProductEnabled = useCategoryProductEnabledAction();

  useEffect(() => {
    setCategoryProductEnabled(true);
  }, [setCategoryProductEnabled]);

  useEffect(() => {
    const sortedData = searchParams.get("sorted") || "updatedAt";
    setSortedType(sortedData);
  }, [searchParams]);

  const handleSortProduct = (cate: string) => {
    setSearchParams({ sorted: cate });
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
        <CategorySortedBar
          selectedValue={sortedType}
          handleSortProduct={handleSortProduct}
        />
      </div>
      {categoryInfo.length > 0 ? (
        <div className="w-full grid grid-flow-row grid-cols-5 gap-5">
          {categoryInfo.map((info: ProductInfiniteFetchingType, idx) => (
            <PreviewProduct
              key={`productPreviewProduct_${idx}`}
              info={info}
              isVisible={false}
              onClick={() => handleClickProduct(idx)}
              viewRef={idx === categoryInfo.length - 1 ? viewRef : undefined}
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
