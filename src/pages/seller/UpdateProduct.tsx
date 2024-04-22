import ProductForm from "@/components/product/ProductForm";
import { db } from "@/firebase";
import downloadUrl from "@/libs/downloadUrl";
import { useSellerProduct } from "@/services/SellerProductProvider";
import { useUser } from "@/services/UserProvider";
import { productInputs } from "@/types/ProductType";
import { doc, setDoc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const productId = Number(useParams().id) - 1;
  const sellerProduct = useSellerProduct();
  const info = sellerProduct[Number(productId)];
  const userId = useUser();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const onSubmit: SubmitHandler<productInputs> = async (data) => {
    const { name, category, price, count, description, imgs } = data;

    // 저장한 각 이미지의 다운로드 url 추가
    const urls: string[] = [];
    //이미 다운로드 url로 변환된 파일이면 그대로 추가하기
    for (let idx = 0; idx < imgs.length; idx++) {
      const img = imgs[idx];
      if (img.includes("blob")) {
        const url = await downloadUrl({ img, productId, idx });
        urls.push(url);
      } else {
        urls.push(img);
      }
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
      if (productInfo.imgs.length > 0) {
        await setDoc(doc(db, "product", String(productId)), productInfo);
        await navigate("/seller", { replace: true });
        alert("수정 완료!");
      } else {
        alert("파일 등록 필요");
      }
    }
  };
  return (
    <ProductForm
      updateProduct={info}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      productId={productId}
    />
  );
};

export default UpdateProduct;
