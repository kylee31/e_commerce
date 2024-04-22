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
  const param = Number(useParams().id) - 1;
  const sellerProduct = useSellerProduct();
  const info = sellerProduct[Number(param)];
  const userId = useUser();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const onSubmit: SubmitHandler<productInputs> = async (data) => {
    const { name, category, price, count, description, imgs } = data;
    //즉, 추가로 submit된 imgs가 없다면 받아온 정보 그대로를 세팅해주고, submit된 이미지가 있다면 아래 로직 실행
    const isEditImgs = Boolean(imgs);
    const urls: string[] = []; //추가된 이미지까지 저장해서 다운로드 url로 반환해주는 배열
    if (isEditImgs) {
      // 저장한 각 이미지의 다운로드 url 추가
      //이미 다운로드 url로 변환된 파일이면 그대로 추가하기
      for (let idx = 0; idx < imgs.length; idx++) {
        const img = imgs[idx];
        if (img.includes("blob")) {
          const url = await downloadUrl({ img, idx, productId: info.id });
          urls.push(url);
        } else {
          urls.push(img);
        }
      }
    }

    if (userId) {
      const productInfo: productInputs = {
        id: param,
        name,
        category,
        price,
        count,
        description,
        //편집된게 있으면 수정한 url정보로, 그대로라면 기존 imgs 정보 세팅
        imgs: isEditImgs ? urls : info.imgs,
        uid: userId,
      };
      if (productInfo.imgs.length > 0) {
        await setDoc(doc(db, "product", String(param)), productInfo);
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
      productId={info.id}
    />
  );
};

export default UpdateProduct;
