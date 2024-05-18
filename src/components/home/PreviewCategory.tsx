import PreviewProduct from "../common/PreviewProduct";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import useGetProductAboutCategory from "@/hooks/useGetProductAboutCategory";
import SkeletonPreviewProduct from "./SkeletonPreviewProduct";

const PreviewCategory = ({ info }: { info: string }) => {
  const { categoryInfo } = useGetProductAboutCategory(info);
  const navigate = useNavigate();

  const handleClickMore = () => {
    navigate(`/category/${info}`);
  };

  const handleClickProduct = (idx: number) => {
    if (!categoryInfo) return;
    const categoryId = categoryInfo[idx].id;
    navigate(`/category/${info}/${categoryId}`);
  };

  return (
    <div className="w-full bg-gray-100 p-10">
      <div className="w-full flex justify-between mb-4">
        <div className="text-lg font-extrabold">{info}</div>
        <div onClick={handleClickMore} className="hover:cursor-pointer">
          <span className="px-4 py-1 border border-gray-400 rounded-lg">
            더보기
          </span>
        </div>
      </div>
      {!categoryInfo ? (
        <div className="w-full grid grid-flow-col grid-cols-4 gap-x-8">
          <SkeletonPreviewProduct />
        </div>
      ) : categoryInfo.length > 0 ? (
        <div className="w-full grid grid-flow-col grid-cols-4 gap-x-8">
          {categoryInfo.map((info: DocumentData, idx: number) => (
            <PreviewProduct
              key={`categoryInfoPreview_${idx}`}
              info={info}
              isVisible={false}
              onClick={() => handleClickProduct(idx)}
            />
          ))}
        </div>
      ) : (
        <div>등록된 상품이 없습니다😥</div>
      )}
    </div>
  );
};

export default PreviewCategory;
