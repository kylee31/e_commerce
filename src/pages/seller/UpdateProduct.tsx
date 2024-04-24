import ProductForm from "@/components/product/ProductForm";
import { db } from "@/firebase";
import downloadUrl from "@/lib/downloadUrl";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { useUser } from "@/services/UserProvider";
import { productInputs } from "@/types/ProductType";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const param = Number(useParams().id) - 1;
  const sellerProduct = useSellerProduct();
  const info = sellerProduct[Number(param)];
  const productRefId = info.id;
  const userId = useUser();
  const nowDate = new Date();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit: SubmitHandler<productInputs> = async (data, event) => {
    const {
      productName,
      productCategory,
      productDescription,
      productImages,
      productPrice,
      productQunatity,
    } = data;
    //즉, 추가로 submit된 imgs가 없다면 받아온 정보 그대로를 세팅해주고, submit된 이미지가 있다면 아래 로직 실행
    const isEditImgs = Boolean(productImages);
    const urls: string[] = []; //추가된 이미지까지 저장해서 다운로드 url로 반환해주는 배열

    if (isEditImgs) {
      // 저장한 각 이미지의 다운로드 url 추가, 이미 다운로드 url로 변환된 파일이면 그대로 추가하기
      for (let idx = 0; idx < productImages.length; idx++) {
        const img = productImages[idx];
        if (img.includes("blob")) {
          const url = await downloadUrl({ img, idx, productRefId });
          urls.push(url);
        } else {
          urls.push(img);
        }
      }
    }

    if (userId) {
      const productRef = doc(db, "product", info.id);
      const productInfo: productInputs = {
        //수정되는 사항? 상품명,카테고리,가격,수량,설명,이미지 그외 없음
        productName,
        productCategory,
        productPrice,
        productQunatity,
        productDescription,
        //편집된게 있으면 수정한 url정보로, 그대로라면 기존 imgs 정보 세팅
        productImages: isEditImgs ? urls : info.productImages,
        updatedAt: nowDate,
      };

      const uploadImgsLength = isEditImgs ? urls.length : info.productImages;

      if (uploadImgsLength == 0) {
        return;
      } else {
        setIsUploading(true);
        event?.preventDefault();
      }
      await updateDoc(productRef, productInfo).then(() => {
        navigate("/seller", { replace: true });
      });
    }
  };
  return (
    <ProductForm
      updateProduct={info}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      isUploading={isUploading}
    />
  );
};

export default UpdateProduct;
