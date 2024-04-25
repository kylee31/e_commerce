import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const getSellerProductInfo = async (productId: string) => {
  const docRef = doc(db, "product", productId);
  const docData = await getDoc(docRef).then((doc) => doc.data());
  return docData;
};

//인피니티 스크롤 snap
export const getSellerProductSnap = async ({
  user,
  pageParam,
}: {
  user: string | null;
  pageParam: any;
}) => {
  const q = pageParam
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
