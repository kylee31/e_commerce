import ProductForm from "@/components/product/ProductForm";
import { db } from "@/firebase";
import downloadUrl from "@/lib/downloadUrl";
import { useUser } from "@/services/UserProvider";
import { productInputs } from "@/types/ProductType";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const [isUploading, setIsUploading] = useState(false);
  const userId = useUser();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<productInputs> = async (data, event) => {
    //create는 update와 다르게 조건이 추가 되어야 함..
    const { name, category, price, count, description, imgs } = data;
    if (imgs != undefined) {
      setIsUploading(true);
      event?.preventDefault();
    } else {
      return;
    }

    if (userId) {
      // 저장한 각 이미지의 다운로드 url 추가
      const urls: string[] = [];
      const productRef = doc(collection(db, "product"));
      const productRefId = productRef.id;
      for (let idx = 0; idx < data.imgs.length; idx++) {
        const img = imgs[idx];
        const url = await downloadUrl({ img, productRefId, idx });
        urls.push(url);
      }
      const productInfo: productInputs = {
        id: productRefId,
        name,
        category,
        price,
        count,
        description,
        imgs: urls,
        uid: userId,
      };

      await setDoc(productRef, productInfo).then(() => {});
    }
    await navigate("/seller");
  };

  return (
    <>
      <ProductForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        isUploading={isUploading}
      />
    </>
  );
};

export default CreateProduct;
