import AlertAnswer from "@/components/common/AlertAnswer";
import PreviewProduct from "@/components/product/PreviewProduct";
import { db, storage } from "@/firebase";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const ReadProduct = () => {
  const sellerProduct = useSellerProduct();
  const navigate = useNavigate();

  //TODO:무한 스크롤 적용하기
  const { ref: viewRef, inView } = useInView({
    threshold: 0,
  });

  //const res = useInfiniteQuery({});

  const handleCreateProduct = () => {
    navigate("create-product");
  };

  const handleEditProduct = (idx: number) => {
    navigate(`edit-product/${idx + 1}`);
  };

  const handleUpdateProduct = (idx: number) => {
    navigate(`/seller/update-product/${idx + 1}`);
  };

  const handleDeleteProduct = async (idx: number) => {
    const info = sellerProduct[idx];
    const productRefId = info.id;

    //상품 삭제 시 저장된 이미지도 삭제하기
    const deleteImages = () => {
      for (let i = 0; i < info.productImages.length; i++) {
        const desertRef = ref(storage, `images/${productRefId}-${i}.png`);
        deleteObject(desertRef);
      }
    };
    await deleteDoc(doc(db, "product", productRefId));
    await deleteImages();
    //상품 삭제 후 뒤로가기 막기
    await navigate("/seller", { replace: true });
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-gray-400 font-bold hover:cursor-pointer"
        onClick={handleCreateProduct}
      >
        상품 등록
      </div>
      {sellerProduct.length == 0 ? (
        <div className="size-full flex justify-center items-center">
          등록한 상품이 없습니다💬
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-7 pt-16">
          {sellerProduct.map((info, idx) => {
            return (
              <div
                key={`privewproduct_${idx}`}
                className="w-full relative hover:cursor-pointer"
                ref={viewRef}
              >
                <div className="w-full mt-1 absolute flex justify-end pr-2">
                  <div
                    onClick={() => handleUpdateProduct(idx)}
                    className="mr-2"
                  >
                    수정
                  </div>
                  <AlertAnswer
                    answer="해당 상품을 삭제하시겠습니까?"
                    text=""
                    onTrueClick={() => handleDeleteProduct(idx)}
                  >
                    <div>삭제</div>
                  </AlertAnswer>
                </div>
                <PreviewProduct
                  key={`sellerProduct_${idx}`}
                  info={info}
                  onClick={() => handleEditProduct(idx)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadProduct;
