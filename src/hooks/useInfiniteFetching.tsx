import { useUser } from "@/services/context/UserProvider";
import {
  getSellerProductSnap,
  getCategoryProductSnap,
} from "@/services/productService";
import {
  useCategoryProductEnabledAction,
  useCategoryProductEnabledState,
} from "@/services/stores/productEnableStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type useInfiniteFetchingType = {
  getQueryKey: string;
  type: string;
  cate?: string;
  sortedType?: string;
  docLength: number;
};

const useInfiniteFetching = ({
  getQueryKey,
  type,
  docLength,
  sortedType,
  cate,
}: useInfiniteFetchingType) => {
  const user = useUser();
  const isCategoryProductEnabled = useCategoryProductEnabledState();
  const setCategoryProductEnabled = useCategoryProductEnabledAction();

  const { ref: viewRef, inView } = useInView({
    threshold: 1,
  });

  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: cate ? [getQueryKey, cate, sortedType] : [getQueryKey],
    queryFn: ({ pageParam }: { pageParam: any }) => {
      if (type == "category" && cate && sortedType) {
        return getCategoryProductSnap({ cate, sortedType, pageParam });
      }
      return getSellerProductSnap({ user, pageParam });
    },
    getNextPageParam: (querySnapshot) => {
      if (querySnapshot.docs.length < docLength) {
        return undefined;
      } else {
        return querySnapshot.docs[querySnapshot.docs.length - 1];
      }
    },
    initialPageParam: null,
    refetchOnMount: type === "category" ? true : false,
    enabled: type === "category" ? isCategoryProductEnabled : undefined,
  });

  const [datas, setDatas] = useState<{ [x: string]: any }[]>();

  useEffect(() => {
    if (data) {
      const updateDatas = data.pages.flatMap((page) =>
        page.docs.map((doc) => ({ ...doc.data() }))
      );
      setDatas(updateDatas);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, sortedType]);

  useEffect(() => {
    if (type === "category" && isCategoryProductEnabled) {
      setCategoryProductEnabled(false);
    }
  }, [type, isCategoryProductEnabled, setCategoryProductEnabled]);

  return { datas, refetch, setDatas, viewRef };
};

export default useInfiniteFetching;
