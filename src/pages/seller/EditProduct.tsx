import AlertAnswer from "@/components/common/AlertAnswer";
import Product from "@/components/product/Product";
import { Button } from "@/components/ui/button";
import { deleteFirebaseData } from "@/services/firebase/deleteFirebaseData";
import { getSellerProductInfo } from "@/services/firebase/getFirebaseData";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const productId = useParams().id!; //Q: 확실하다면 !로 강제해서 써도 괜찮은지?
  const [productInfo, setProductInfo] = useState<DocumentData>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductInfo = async () => {
      const sellerProductInfo = await getSellerProductInfo(productId);
      setProductInfo(sellerProductInfo);
    };
    getProductInfo();
  }, []);

  const handleUpdateProduct = () => {
    navigate(`/seller/update-product/${productId}`);
  };

  const handleDeleteProduct = async () => {
    await deleteFirebaseData(productInfo);
    await navigate("/seller", { replace: true });
  };

  //TODO:상품 클릭 데이터 prefetching
  return (
    <div className="w-full h-full">
      {productInfo && (
        <div className="w-full h-full flex flex-col">
          <Product productInfo={productInfo} />
          <div className="w-full grid grid-cols-2 gap-3 mt-1">
            <Button onClick={handleUpdateProduct}>수정</Button>
            <AlertAnswer
              onTrueClick={handleDeleteProduct}
              answer="해당 상품을 삭제하시겠습니까?"
            >
              <Button>삭제</Button>
            </AlertAnswer>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProduct;
