import { useUser } from "@/services/UserProvider";
import { getSellerProductSnap } from "@/services/firebase/getFirebaseData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteSellerFetching = () => {
  const user = useUser();

  const { ref: viewRef, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["sellerProduct", user],
    queryFn: ({ pageParam }: { pageParam: any }) => {
      return getSellerProductSnap({ user, pageParam });
    },
    getNextPageParam: (querySnapshot) => {
      if (querySnapshot.docs.length < 12) {
        return undefined;
      } else return querySnapshot.docs[querySnapshot.docs.length - 1];
    },
    initialPageParam: null,
  });

  const allData = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) =>
        page.docs.map((doc) => ({ ...doc.data() }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  //useInfiniteFetching 커스텀 훅, allData는 fetching해서 받은 모든 데이터, viewRef는 스크롤 감지하기 위해 전달하는 viewRef값
  return { allData, viewRef };
};

export default useInfiniteSellerFetching;
