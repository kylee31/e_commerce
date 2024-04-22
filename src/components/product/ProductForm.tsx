import { ProductInputData } from "@/services/data/ProductData";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { productInputs } from "@/types/ProductType";
import { DocumentData } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase";

const INPUT_LIST = ProductInputData;

const ProductForm = ({
  handleSubmit,
  onSubmit,
  updateProduct,
  register,
  setValue,
  productId,
}: {
  handleSubmit: UseFormHandleSubmit<productInputs, undefined>;
  onSubmit: SubmitHandler<productInputs>;
  updateProduct?: DocumentData;
  register: UseFormRegister<productInputs>;
  setValue: UseFormSetValue<productInputs>;
  productId: number;
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (updateProduct) {
      setImages(updateProduct.imgs);
    }
  }, [updateProduct]);

  //TODO: 동일 파일 연속으로 등록 불가한 사항 수정하기(input값에 cache되어있음?)
  const handleSaveImage = async (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((img) => [...img, ...selectedFiles]);
    setValue("imgs", [...images, ...selectedFiles]);
  };

  const handleRemoveImage = (idx: number) => {
    const filterImages = images.filter((_, index) => index != idx);
    setImages(filterImages);
    setValue("imgs", filterImages);
    //수정할 때만 적용, 저장되어 있던 이미지 삭제하면 해당 이미지 storage에서 삭제하기
    if (updateProduct) {
      const desertRef = ref(storage, `images/${productId}-${idx}.png`);
      deleteObject(desertRef);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col pb-8"
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
            multiple
            onChange={handleSaveImage}
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
                    defaultValue={updateProduct ? updateProduct[ele.value] : ""}
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
                defaultValue={updateProduct ? updateProduct.count : ""}
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
            defaultValue={updateProduct ? updateProduct.description : ""}
          />
        </div>
      </div>
      <Button text="등록" type="submit" />
    </form>
  );
};

export default ProductForm;
