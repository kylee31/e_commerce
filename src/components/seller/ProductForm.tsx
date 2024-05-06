import { ProductCategory, ProductInputData } from "@/services/data/ProductData";
import { useEffect, useState } from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ProductInputListType, ProductInputsType } from "@/types/ProductType";
import { DocumentData } from "firebase/firestore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const INPUT_LIST = ProductInputData;
const PRODUCT_CATEGORY = ProductCategory;

const ProductForm = ({
  handleSubmit,
  onSubmit,
  updateProduct,
  register,
  setValue,
  isUpdate,
  isUploading,
}: {
  handleSubmit: UseFormHandleSubmit<ProductInputsType, undefined>;
  onSubmit: SubmitHandler<ProductInputsType>;
  updateProduct?: DocumentData;
  register: UseFormRegister<ProductInputsType>;
  setValue: UseFormSetValue<ProductInputsType>;
  isUploading: boolean;
  isUpdate: boolean;
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (updateProduct) {
      setImages(updateProduct.productImages);
      setValue("productCategory", updateProduct.productCategory);
    }
  }, [updateProduct, setValue]);

  //TODO: 동일 파일 연속으로 등록 불가한 사항 수정하기(input값에 cache되어있음?)
  const handleSaveImage = async (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    const maxAllowFiles = 4;
    if (targetFilesArray.length + images.length > maxAllowFiles) {
      return;
    }

    setImages((img) => [...img, ...selectedFiles]);
    setValue("productImages", [...images, ...selectedFiles]);
  };

  const handleRemoveImage = (idx: number) => {
    const filterImages = images.filter((_, index) => index != idx);
    setImages(filterImages);
    setValue("productImages", filterImages);
  };

  const handleCategoryChange = (ele: string) => {
    setValue("productCategory", ele);
  };

  const handlePreventEvent = (e: React.MouseEvent) => {
    if (updateProduct) {
      if (isUploading) {
        e.preventDefault();
      }
    } else {
      if (isUploading && images.length > 0) {
        e.preventDefault();
      }
    }
  };

  if (updateProduct == undefined && isUpdate) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div className="w-full h-2/3 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
          <div className="size-full relative flex justify-center items-center">
            {images.length != 0 ? (
              <Carousel className="w-3/4 h-full rounded-md flex justify-center items-center text-sm mb-1 border">
                <CarouselContent>
                  {images.map((url: string, idx) => (
                    <CarouselItem
                      key={`previewimg_${idx}`}
                      className="w-full h-full flex flex-col justify-center items-center"
                    >
                      <div onClick={() => handleRemoveImage(idx)}>삭제</div>
                      <img src={url} alt="" width={150} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious type="button" />
                <CarouselNext type="button" />
              </Carousel>
            ) : (
              <div className="size-full whitespace-nowrap rounded-md border flex justify-center items-center text-sm ">
                {images.length == 0 ? (
                  <div>
                    사진은 최소 1장 이상 추가해주세요!
                    <br />
                    <span className="text-xs text-red-400">(최대 4개)</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="size-6 bg-black absolute right-2 bottom-2 text-white flex justify-center items-center rounded-full">
              {images.length}
            </div>
          </div>
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
            <div className="w-full flex mb-3"></div>
            {INPUT_LIST.map((ele: ProductInputListType, idx) => {
              const isCategory = ele.value == "productCategory";
              return (
                <div key={`product_${idx}`} className="w-full flex mb-3">
                  <Label className="w-1/3 flex justify-start">
                    {ele.label}
                  </Label>
                  {isCategory ? (
                    <Select
                      defaultValue={
                        updateProduct ? updateProduct.productCategory : null
                      }
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="w-full border-gray-500">
                        <SelectValue
                          {...register("productCategory", { required: true })}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {PRODUCT_CATEGORY.map((cate: string, idx) => (
                            <SelectItem key={`productCate_${idx}`} value={cate}>
                              {cate}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={ele.type}
                      className="w-full border-gray-500 border rounded-sm"
                      {...register(ele.value, { required: true })}
                      defaultValue={
                        updateProduct ? updateProduct[ele.value] : ""
                      }
                    />
                  )}
                </div>
              );
            })}
            <hr className="border-2 my-4" />
            <div className="w-full flex mb-3">
              <Label className="w-1/3 flex justify-start">수량</Label>
              <Input
                type="text"
                className="w-full border-gray-500 border rounded-sm"
                {...register("productQunatity", { required: true })}
                defaultValue={
                  updateProduct ? updateProduct.productQunatity : ""
                }
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
            {...register("productDescription", { required: true })}
            defaultValue={updateProduct ? updateProduct.productQunatity : ""}
          />
        </div>
      </div>
      <Button className="w-full" type="submit" onClick={handlePreventEvent}>
        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        저장
      </Button>
    </form>
  );
};

export default ProductForm;
