import { useUser } from "@/services/context/UserProvider";
import {
  getSellerProductSnap,
  getCategoryProductSnap,
} from "@/services/productService";
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

  const { ref: viewRef, inView } = useInView({
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: [getQueryKey],
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
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (sortedType) {
      refetch();
    }
  }, [sortedType, refetch]);

  return { datas, setDatas, viewRef };
};

export default useInfiniteFetching;
