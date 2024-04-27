import PreviewProduct from "@/components/common/PreviewProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInfiniteFetching from "@/hooks/useInfiniteFetching";
import { DocumentData } from "firebase/firestore";
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

  const handleSortedInfo = (cate: string) => {
    setSortedType(cate);
  };

  const handleClickProduct = (idx: number) => {
    if (categoryInfo) {
      navigate(`/category/${categoryId}/${categoryInfo[idx].id}`);
    }
  };

  return (
    <div className="w-full common-padding">
      <div className="font-extrabold text-3xl mb-10">{categoryId}</div>
      <div className="w-full h-10 border-2 mb-8 flex justify-start items-center">
        <Select
          defaultValue={"updatedAt"}
          onValueChange={(cate) => handleSortedInfo(cate)}
        >
          <SelectTrigger className="w-full border-gray-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="updatedAt">최신 등록 순</SelectItem>
              <SelectItem value="lowerPrice">낮은 가격 순</SelectItem>
              <SelectItem value="upperPrice">높은 가격 순</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full grid grid-flow-row grid-cols-5 gap-5">
        {categoryInfo &&
          categoryInfo.map((info: DocumentData, idx: number) => (
            <PreviewProduct
              key={`productPreviewProduct_${idx}`}
              info={info}
              isVisible={false}
              onClick={() => handleClickProduct(idx)}
              viewRef={viewRef}
            />
          ))}
      </div>
    </div>
  );
};
export default Category;
