import { ProductCategoryType } from "@/types/ProductType";
import PreviewProduct from "../common/PreviewProduct";
import { useNavigate, useParams } from "react-router-dom";

const PreviewCategory = ({ info }: { info: ProductCategoryType }) => {
  const categoryInfo = {
    productImages: ["dd"],
    productName: "dd",
    productCategory: "공예",
    productPrice: "가격",
    productQunatity: "재고",
  };

  const categoryId = useParams().cate;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <div className="text-lg font-extrabold">{info.cate}</div>
        <div onClick={handleClick} className="hover:cursor-pointer">
          {info.cate} 더보기🖤
        </div>
      </div>
      <div className="w-full flex space-x-8">
        <PreviewProduct
          info={categoryInfo}
          onClick={() => {}}
          isVisible={false}
        />
        <PreviewProduct
          info={categoryInfo}
          onClick={() => {}}
          isVisible={false}
        />
        <PreviewProduct
          info={categoryInfo}
          onClick={() => {}}
          isVisible={false}
        />
        <PreviewProduct
          info={categoryInfo}
          onClick={() => {}}
          isVisible={false}
        />
      </div>
    </div>
  );
};

export default PreviewCategory;
