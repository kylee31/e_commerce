import { Skeleton } from "../ui/skeleton";

const SkeletonPreviewProduct = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => {
        return (
          <div
            key={`skeleton_preview_${idx}`}
            className="w-full h-full flex flex-col"
          >
            <Skeleton className="h-[300px] w-full rounded-xl bg-slate-200" />
          </div>
        );
      })}
    </>
  );
};

export default SkeletonPreviewProduct;
