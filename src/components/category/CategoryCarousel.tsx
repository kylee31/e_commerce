import Autoplay from "embla-carousel-autoplay";
import { ProductCategoryType } from "@/types/ProductType";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = ({
  category,
}: {
  category: ProductCategoryType[];
}) => {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const handleClickCategoryCarousel = (cate: string) => {
    navigate(`/category/${cate}`);
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-44 rounded-md border flex justify-center items-center text-sm mb-10 bg-gray-200"
    >
      <CarouselContent>
        {category.map((info: ProductCategoryType, idx) => (
          <CarouselItem
            key={`categoryImg_${idx}`}
            className="w-full h-full flex justify-center items-center"
            onClick={() => handleClickCategoryCarousel(info.cate)}
          >
            <img src={info.url} alt="" width={150} />
            <div className="text-lg font-extrabold ml-10">{info.cate}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  );
};

export default CategoryCarousel;
