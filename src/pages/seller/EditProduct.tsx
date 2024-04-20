import Button from "@/components/common/Button";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams().id;
  const sellerProduct = useSellerProduct();
  const name = sellerProduct[Number(params) - 1].name;
  if (params) {
    //console.log(sellerProduct[Number(params) - 1]);
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" text="수정" />
        <Button type="button" text="삭제" />
      </div>
      <>{name}</>
    </div>
  );
};
export default EditProduct;
