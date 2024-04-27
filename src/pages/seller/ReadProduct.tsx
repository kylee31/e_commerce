import AlertAnswer from "@/components/common/AlertAnswer";
import PreviewProduct from "@/components/common/PreviewProduct";
import useInfiniteSellerFetching from "@/hooks/useInfiniteSellerFetching";
import { deleteFirebaseData } from "@/services/firebase/deleteFirebaseData";
import { useNavigate } from "react-router-dom";

const ReadProduct = () => {
  const { allData: products, viewRef } = useInfiniteSellerFetching();
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("create-product");
  };

  const handleEditProduct = (idx: number) => {
    if (products) {
      const productId = products[idx].id;
      navigate(`edit-product/${productId}`);
    }
  };

  const handleUpdateProduct = (idx: number) => {
    if (products) {
      const productId = products[idx].id;
      navigate(`/seller/update-product/${productId}`);
    }
  };

  //TODO: 변경사항 즉시 반영하기
  const handleDeleteProduct = async (idx: number) => {
    if (products) {
      const productInfo = products[idx];
      await deleteFirebaseData(productInfo);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start relative">
      <div
        className="flex absolute right-0 top-0 justify-center items-center w-24 h-8 bg-gray-400 font-bold hover:cursor-pointer"
        onClick={handleCreateProduct}
      >
        상품 등록
      </div>
      {products?.length == 0 ? (
        <div className="size-full flex justify-center items-center">
          등록한 상품이 없습니다💬
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-7 pt-16">
          {products?.map((info, idx) => {
            return (
              <div
                key={`privewproduct_${idx}`}
                className="w-full relative hover:cursor-pointer"
                ref={viewRef}
              >
                <div className="w-full mt-2 absolute flex justify-end pr-2 text-xs">
                  <div
                    onClick={() => handleUpdateProduct(idx)}
                    className="mr-2"
                  >
                    <div>빠른 수정</div>
                  </div>
                  <AlertAnswer
                    answer="해당 상품을 삭제하시겠습니까?"
                    onTrueClick={() => handleDeleteProduct(idx)}
                  >
                    <div>삭제</div>
                  </AlertAnswer>
                </div>
                <PreviewProduct
                  key={`sellerProduct_${idx}`}
                  info={info}
                  onClick={() => handleEditProduct(idx)}
                  isVisible={true}
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
