import { db } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const getSellerProductSnap = async ({
  user,
  pageParam,
}: {
  user: string | null;
  pageParam: any;
}) => {
  //처음 불러올때, 이후 불러올때 달라지기
  const q = user
    ? query(
        collection(db, "product"),
        where("sellerId", "==", user),
        orderBy("sellerId"),
        startAfter(pageParam),
        limit(12)
      )
    : query(
        collection(db, "product"),
        where("sellerId", "==", user),
        orderBy("sellerId"),
        limit(12)
      );

  const docSnap = await getDocs(q);
  return docSnap;
};
