import AlertAnswer from "@/components/common/AlertAnswer";
import SellerProduct from "@/components/seller/SellerProduct";
import { Button } from "@/components/ui/button";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { deleteSellerProduct } from "@/services/productService";
import { useNavigate, useParams } from "react-router-dom";
import useProductMutation from "@/hooks/useProductMutation";

const EditProduct = () => {
  const productId = useParams().id!;
  const { productInfo } = useGetProductInfo(productId);
  const deleteProductMutation = useProductMutation({
    mutationFunction: deleteSellerProduct,
    nav: "/seller",
    navOption: { replace: true },
  });

  const navigate = useNavigate();

  const handleUpdateProduct = () => {
    navigate(`/seller/update-product/${productId}`);
  };

  const handleDeleteProduct = async () => {
    try {
      deleteProductMutation.mutateAsync({ productData: productInfo });
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!productInfo) {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        <SellerProduct productInfo={productInfo} />
        <div className="w-full grid grid-cols-2 gap-3 mt-1">
          <Button onClick={handleUpdateProduct}>수정</Button>
          <AlertAnswer
            onTrueClick={handleDeleteProduct}
            answer="해당 상품을 삭제하시겠습니까?"
            text="삭제 시 복구가 불가능합니다"
            trueButton="삭제"
            falseButton="취소"
          >
            <Button>삭제</Button>
          </AlertAnswer>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
