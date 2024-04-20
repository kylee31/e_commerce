import Button from "@/components/common/Button";
import { db } from "@/firebase";
import { useUser } from "@/services/UserProvider";
import { ProductInputData } from "@/services/data/ProductData";
import { productInputs } from "@/types/ProductType";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const INPUT_LIST = ProductInputData;

const AddProduct = () => {
  const { handleSubmit, register } = useForm<productInputs>();
  const [images, setImages] = useState<string[]>([]);
  const userId = useUser();
  const navigate = useNavigate();

  const handlePreview = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((img) => [...img, ...selectedFiles]);
  };

  const handleRemoveImage = (idx: number) => {
    setImages((img) => img.filter((_, index) => index != idx));
  };

  const onSubmit: SubmitHandler<productInputs> = async (data) => {
    const { name, category, price, count, description } = data;
    if (userId) {
      const productInfo: productInputs = {
        name,
        category,
        price,
        count,
        description,
        imgs: images,
        uid: userId,
      };
      await addDoc(collection(db, "product"), productInfo);
      await navigate("/seller");
    }
    alert("등록 완료!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col pb-12"
    >
      <div className="w-full h-2/3 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center p-3 ">
          <div className="w-full h-32 flex border-2">
            {images.map((url, idx) => {
              return (
                <div key={`inputImg_${idx}`} className="border-2">
                  <img src={url} alt="" width={80} height={80} />
                  <button type="button" onClick={() => handleRemoveImage(idx)}>
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
          <input
            type="file"
            accept="image/*"
            {...register("imgs", { required: true })}
            onChange={handlePreview}
            className={`${images.length < 4 ? "none" : "hidden"}`}
          />
        </div>
        {/*오른쪽*/}
        <div className="w-1/2 h-full p-3  flex justify-center items-center">
          <div className="w-full">
            {INPUT_LIST.map((ele, idx) => {
              return (
                <div key={`product_${idx}`} className="w-full flex mb-3">
                  <span className="w-1/3 flex justify-start">{ele.label}</span>
                  <input
                    type={ele.type}
                    className="w-full border-gray-500 border rounded-sm"
                    {...register(ele.value, { required: true })}
                  />
                </div>
              );
            })}
            <hr className="border-2 my-4" />
            <div className="w-full flex mb-3">
              <span className="w-1/3 flex justify-start">수량</span>
              <input
                type="text"
                className="w-full border-gray-500 border rounded-sm"
                {...register("count", { required: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-2 my-4" />
      <div className="w-full h-1/3 flex justify-center items-center ">
        <div className="w-full h-full flex flex-col justify-center items-start mb-3">
          <span>설명</span>
          <textarea
            className="w-full h-1/2 border-gray-500 border rounded-sm mt-3 resize-none"
            {...register("description", {
              required: { value: true, message: "상품명을 입력해주세요." },
            })}
          />
        </div>
      </div>
      <Button text="등록" type="submit" />
    </form>
  );
};

export default AddProduct;
