import AlertAnswer from "@/components/common/AlertAnswer";
import Product from "@/components/product/Product";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/firebase";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const idx = Number(useParams().id) - 1;
  const sellerProduct = useSellerProduct();
  const info = sellerProduct[idx];

  const handleUpdateProduct = () => {
    navigate(`/seller/update-product/${idx + 1}`);
  };

  const handleDeleteProduct = async () => {
    const productRefId = info.id;

    //상품 삭제 시 저장된 이미지도 삭제하기
    const deleteImages = () => {
      for (let i = 0; i < info.imgs.length; i++) {
        const desertRef = ref(storage, `images/${productRefId}-${i}.png`);
        deleteObject(desertRef);
      }
    };
    await deleteDoc(doc(db, "product", productRefId));
    await deleteImages;
    await navigate("/seller", { replace: true });
  };

  return (
    <div className="w-full h-full">
      {
        /*상품 삭제 후 navigate로 이동하므로 0개일때 Item 컴포넌트에서 오류가 발생함. 해당 상황에 대한 처리*/
        info && (
          <div className="w-full h-full flex flex-col">
            <Product idx={idx} />
            <div className="w-full grid grid-cols-2 gap-3 mt-1">
              <Button onClick={handleUpdateProduct}>수정</Button>
              <AlertAnswer
                onTrueClick={handleDeleteProduct}
                answer="해당 상품을 삭제하시겠습니까?"
                text=""
              >
                <Button>삭제</Button>
              </AlertAnswer>
            </div>
          </div>
        )
      }
    </div>
  );
};
export default EditProduct;
