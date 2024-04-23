import { ProductInputData } from "@/services/data/ProductData";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
    //수정할 때만 적용하는 로직, 저장되어 있던 이미지 삭제하면 해당 이미지 storage에서 삭제하기
    if (updateProduct) {
      const desertRef = ref(storage, `images/${productId}-${idx}.png`);
      deleteObject(desertRef);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div className="w-full h-2/3 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
          {images.length != 0 ? (
            <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border">
              <div className="flex w-max h-full space-x-4 p-5 items-center overflow-hidden">
                {images.map((url, idx) => {
                  return (
                    <div
                      key={`inputImg_${idx}`}
                      className="w-full border-2 rounded-sm space-x-2"
                    >
                      <img src={url} alt="" width={140} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                      >
                        삭제
                      </button>
                    </div>
                  );
                })}
              </div>
              <ScrollBar className="hover:none" orientation="horizontal" />
            </ScrollArea>
          ) : (
            <div className="size-full whitespace-nowrap rounded-md border flex justify-center items-center text-sm">
              사진은 최소 1장 이상 추가해주세요!
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleSaveImage}
            className={`bg-gray-300`}
          />
        </div>
        {/*오른쪽*/}
        <div className="w-1/2 h-full flex justify-center items-center pl-3">
          <div className="w-full">
            {INPUT_LIST.map((ele, idx) => {
              return (
                <div key={`product_${idx}`} className="w-full flex mb-3">
                  <Label className="w-1/3 flex justify-start">
                    {ele.label}
                  </Label>
                  <Input
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
              <Label className="w-1/3 flex justify-start">수량</Label>
              <Input
                type="text"
                className="w-full border-gray-500 border rounded-sm"
                {...register("count", { required: true })}
                defaultValue={updateProduct ? updateProduct.count : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-2 my-4" />
      <div className="w-full h-1/3 flex justify-center items-center ">
        <div className="w-full h-full flex flex-col justify-center items-start mb-3">
          <Label>설명</Label>
          <Textarea
            className="w-full h-1/2 border-gray-500 border rounded-sm mt-3 resize-none"
            {...register("description", { required: true })}
            defaultValue={updateProduct ? updateProduct.description : ""}
          />
        </div>
      </div>
      <Button className="w-full" type="submit">
        {/*<Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
        저장
      </Button>
    </form>
  );
};

export default ProductForm;
