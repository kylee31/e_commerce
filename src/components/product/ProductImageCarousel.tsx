import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const ProductImageCarousel = ({
  productImages,
}: {
  productImages: string[];
}) => {
  return (
    <Carousel className="w-3/4 h-full rounded-md border flex justify-center items-center text-sm mb-1">
      <CarouselContent>
        {productImages.map((url: string, idx: number) => (
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
  );
};

export default ProductImageCarousel;
