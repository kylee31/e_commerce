import { useNavigate } from "react-router-dom";

const ShowProduct = () => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("add-product");
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-slate-400 font-bold"
        onClick={handleAddProduct}
      >
        상품 등록
      </div>
      {/*TODO: 상품 CRUD */}
      💁‍♂️ 판매자 페이지 (등록 상품 리스트)
    </div>
  );
};

export default ShowProduct;
