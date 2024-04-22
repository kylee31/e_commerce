import Button from "@/components/common/Button";
import Product from "@/components/product/Product";
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
    //상품 삭제 시 저장된 이미지도 삭제하기
    const deleteImages = () => {
      for (let i = 0; i < info.imgs.length; i++) {
        const desertRef = ref(storage, `images/${info.id}-${i}.png`);
        deleteObject(desertRef);
      }
    };
    await deleteDoc(doc(db, "product", String(info.id)));
    await deleteImages();
    //상품 삭제 후 뒤로가기 막기
    await navigate("/seller", { replace: true });
  };

  return (
    <div className="w-full h-full pb-16">
      {
        /*상품 삭제 후 navigate로 이동하므로 0개일때 Item 컴포넌트에서 오류가 발생함. 해당 상황에 대한 처리(삼항)*/
        info ? (
          <>
            <Product idx={idx} />
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" text="수정" onClick={handleUpdateProduct} />
              <Button type="button" text="삭제" onClick={handleDeleteProduct} />
            </div>
          </>
        ) : (
          <></>
        )
      }
    </div>
  );
};
export default EditProduct;
