import PreviewProduct from "@/components/product/PreviewProduct";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { useNavigate } from "react-router-dom";

const ReadProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("create-product");
  };

  const handleEditProduct = (idx: number) => {
    navigate(`edit-product/${idx + 1}`);
  };

  const sellerProduct = useSellerProduct();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-gray-400 font-bold hover:cursor-pointer"
        onClick={handleCreateProduct}
      >
        상품 등록
      </div>
      <div className="w-full grid grid-cols-4 gap-3 pt-16">
        {sellerProduct.map((info, idx) => {
          return (
            <PreviewProduct
              key={`sellerProduct_${idx}`}
              info={info}
              onClick={() => handleEditProduct(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReadProduct;
