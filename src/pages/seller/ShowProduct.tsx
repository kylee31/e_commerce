import PreviewItem from "@/components/product/PreviewItem";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { Link, useNavigate } from "react-router-dom";

const ShowProduct = () => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("add-product");
  };

  const sellerProduct = useSellerProduct().sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  //console.log(sellerProduct.sort((a, b) => a.name.localeCompare(b.name)));
  /*arr.sort((a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});*/

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-slate-400 font-bold hover:cursor-pointer"
        onClick={handleAddProduct}
      >
        상품 등록
      </div>
      {/*TODO: 상품 CRUD */}
      <div className="w-full grid grid-cols-4 gap-3 pt-20">
        {sellerProduct.map((item, idx) => {
          return (
            <Link to={`edit-product/${idx + 1}`} key={`sellerProduct_${idx}`}>
              <PreviewItem
                name={item.name}
                price={item.price}
                img={item.imgs}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShowProduct;
