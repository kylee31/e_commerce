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

  const sellerProduct = useSellerProduct().sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="w-full h-full flex flex-col relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-slate-400 font-bold hover:cursor-pointer"
        onClick={handleCreateProduct}
      >
        상품 등록
      </div>
      <div className="w-full grid grid-cols-4 gap-3 pt-24">
        {sellerProduct.map((item, idx) => {
          return (
            <PreviewProduct
              key={`sellerProduct_${idx}`}
              name={item.name}
              price={item.price}
              img={item.imgs}
              onClick={() => handleEditProduct(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReadProduct;
