import { productFieldData } from "@/services/data/ProductData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { DocumentData } from "firebase/firestore";

const FIELD_LIST = productFieldData;

const Product = ({ productInfo }: { productInfo: DocumentData }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-64 flex">
        {/*왼쪽*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center pr-3">
          <div className="size-full flex justify-center items-center rounded-md">
            <Carousel className="w-3/4 h-full rounded-md border flex justify-center items-center text-sm mb-1">
              <CarouselContent>
                {productInfo.productImages.map((url: string, idx: number) => (
                  <CarouselItem
                    key={`previewimg_${idx}`}
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                    <img src={url} alt="" width={150} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious type="button" />
              <CarouselNext type="button" />
            </Carousel>
          </div>
        </div>
        {/*오른쪽*/}
        <div className="w-1/2 h-full pl-3 flex justify-center items-center">
          <div className="w-full h-full">
            {FIELD_LIST.map((ele, idx) => (
              <div
                key={`productSchema_${idx}`}
                className="w-full h-1/5 flex mb-2"
              >
                <span className="w-1/3 flex justify-start">{ele.label}</span>
                <span className="size-full flex justify-end">
                  {productInfo[ele.value]}
                </span>
              </div>
            ))}
            <hr className="border-2 my-4" />
            <div className="w-full flex justify-between mb-3 ">
              <span className="w-1/3 flex justify-start">수량</span>
              <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
                -
              </div>
              <span className="mx-16">{productInfo.productQunatity}</span>
              <div className="size-8 bg-gray-300 flex justify-center items-center font-bold text-3xl">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-2 my-4" />
      <div className="w-full h-auto flex flex-col justify-center items-start">
        <span>설명</span>
        <div className="w-full h-auto bg-gray-100 mt-2 min-h-24 p-8 rounded-md overflow-auto break-words">
          {productInfo.productDescription}
        </div>
      </div>
    </div>
  );
};
export default Product;
