import PreviewProduct from "../common/PreviewProduct";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductAboutCategory } from "@/services/firebase/getFirebaseData";
import { DocumentData } from "firebase/firestore";

const PreviewCategory = ({ info }: { info: string }) => {
  const [categoryInfo, setCategoryInfo] = useState<DocumentData>();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryInfo = async () => {
      const productAboutCategory = await getProductAboutCategory(info);
      setCategoryInfo(productAboutCategory.slice(0, 4));
    };
    getCategoryInfo();
  }, []);

  const handleClickMore = () => {
    navigate(`/category/${info}`);
  };

  const handleClickProduct = (idx: number) => {
    if (categoryInfo) {
      navigate(`/category/${info}/${categoryInfo[idx].id}`);
    }
  };

  if (categoryInfo == undefined) {
    return <></>;
  }

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
      {categoryInfo ? (
        <div className="w-full flex space-x-8">
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
