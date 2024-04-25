import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CustomCarousel = ({
  children,
  withClass,
}: {
  children: React.ReactNode;
  withClass: string;
}) => {
  return (
    <Carousel
      className={`w-3/4 rounded-md border flex justify-center items-center text-sm mb-1 ${withClass}`}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  );
};
export default CustomCarousel;
