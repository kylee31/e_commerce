import ProductForm from "@/components/product/ProductForm";
import { db } from "@/firebase";
import downloadUrl from "@/lib/downloadUrl";
import { getSellerProductInfo } from "@/services/firebase/getFirebaseData";
import { productInputs } from "@/types/ProductType";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const productId = useParams().id!;
  const nowDate = new Date();
  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const [isUploading, setIsUploading] = useState(false);
  const [productInfo, setProductInfo] = useState<DocumentData>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductInfo = async () => {
      const sellerProductInfo = await getSellerProductInfo(productId);
      setProductInfo(sellerProductInfo);
    };
    getProductInfo();
  }, []);

  const onSubmit: SubmitHandler<productInputs> = async (data, event) => {
    const {
      productName,
      productCategory,
      productDescription,
      productImages,
      productPrice,
      productQunatity,
    } = data;

    const isEditImgs = Boolean(productImages);
    const urls: string[] = [];

    if (isEditImgs) {
      // 저장한 각 이미지의 다운로드 url 추가, 이미 다운로드 url로 변환된 파일이면 그대로 추가하기
      for (let idx = 0; idx < productImages.length; idx++) {
        const img = productImages[idx];
        if (img.includes("blob")) {
          const url = await downloadUrl({ img, idx, productId });
          urls.push(url);
        } else {
          urls.push(img);
        }
      }
    }

    if (productInfo) {
      const productRef = doc(db, "product", productId);
      const newProductInfo: productInputs = {
        productName,
        productCategory,
        productPrice,
        productQunatity,
        productDescription,
        //편집된게 있으면 수정한 url정보로, 그대로라면 기존 imgs 정보 세팅
        productImages: isEditImgs ? urls : productInfo.productImages,
        updatedAt: nowDate,
      };

      const uploadImgsLength = isEditImgs
        ? urls.length
        : productInfo.productImages;

      if (uploadImgsLength == 0) {
        return;
      } else {
        setIsUploading(true);
        event?.preventDefault();
      }
      await updateDoc(productRef, newProductInfo).then(() => {
        navigate("/seller", { replace: true });
      });
    }
  };
  return (
    <ProductForm
      isUpdate={true}
      updateProduct={productInfo}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      isUploading={isUploading}
    />
  );
};

export default UpdateProduct;
