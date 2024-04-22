import ProductForm from "@/components/product/ProductForm";
import { db } from "@/firebase";
import downloadUrl from "@/libs/downloadUrl";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { useUser } from "@/services/UserProvider";
import { productInputs } from "@/types/ProductType";
import { doc, setDoc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const userId = useUser();
  const sellerProduct = useSellerProduct();
  const productId = sellerProduct.length;
  const navigate = useNavigate();

  //업로드 시 가져온 string(blob url)을 모두 storage에 저장하고 다운로드 url로 변환

  const onSubmit: SubmitHandler<productInputs> = async (data) => {
    const { name, category, price, count, description, imgs } = data;
    const urls: string[] = [];

    // 저장한 각 이미지의 다운로드 url 추가
    for (let idx = 0; idx < imgs.length; idx++) {
      const img = imgs[idx];
      const url = await downloadUrl({ img, productId, idx });
      urls.push(url);
    }

    if (userId) {
      const productInfo: productInputs = {
        id: productId,
        name,
        category,
        price,
        count,
        description,
        imgs: urls,
        uid: userId,
      };
      await setDoc(
        doc(db, "product", String(sellerProduct.length)),
        productInfo
      );
      await navigate("/seller");
    }
    alert("등록 완료!");
  };

  return (
    <ProductForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      productId={productId}
    />
  );
};

export default CreateProduct;
