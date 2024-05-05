import { db } from "@/firebase";
import {
  DocumentData,
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
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return { docSnap, docData };
};

export const getProductAboutCategory = async (cate: string) => {
  const q = query(
    collection(db, "product"),
    where("productCategory", "==", cate),
    orderBy("updatedAt", "desc")
  );
  const docSnap = await getDocs(q);
  const docData = docSnap.docs.map((doc) => doc.data());
  return docData;
};

export const getRecommendedProducts = async ({
  productCategory,
  productDocSnap,
}: {
  productCategory: string;
  productDocSnap: DocumentData;
}) => {
  const q = query(
    collection(db, "product"),
    where("productCategory", "==", productCategory),
    orderBy("productPrice", "desc"),
    startAfter(productDocSnap),
    limit(4)
  );
  const docSnap = await getDocs(q);
  const docData = docSnap.docs.map((doc) => doc.data());
  return docData;
};

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
        orderBy("updatedAt", "desc"),
        startAfter(pageParam),
        limit(12)
      )
    : query(
        collection(db, "product"),
        where("sellerId", "==", user),
        orderBy("sellerId"),
        orderBy("updatedAt", "desc"),
        limit(12)
      );

  const docSnap = await getDocs(q);
  return docSnap;
};

export const getCategoryProductSnap = async ({
  cate,
  sortedType,
  pageParam,
}: {
  cate: string | null;
  sortedType: string;
  pageParam: any;
}) => {
  let q = pageParam
    ? query(
        collection(db, "product"),
        where("productCategory", "==", cate),
        orderBy("updatedAt", "desc"),
        startAfter(pageParam),
        limit(10)
      )
    : query(
        collection(db, "product"),
        where("productCategory", "==", cate),
        orderBy("updatedAt", "desc"),
        limit(10)
      );

  if (sortedType === "updatedAt") {
    q = pageParam
      ? query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("updatedAt", "desc"),
          startAfter(pageParam),
          limit(10)
        )
      : query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("updatedAt", "desc"),
          limit(10)
        );
  } else if (sortedType === "upperPrice") {
    q = pageParam
      ? query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("productPrice", "desc"),
          startAfter(pageParam),
          limit(10)
        )
      : query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("productPrice", "desc"),
          limit(10)
        );
  } else if (sortedType === "lowerPrice") {
    q = pageParam
      ? query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("productPrice", "asc"),
          startAfter(pageParam),
          limit(10)
        )
      : query(
          collection(db, "product"),
          where("productCategory", "==", cate),
          orderBy("productPrice", "asc"),
          limit(10)
        );
  }

  const docSnap = await getDocs(q);
  return docSnap;
};

export const getOrderItems = async ({
  id,
  user,
}: {
  id: string;
  user: string | null;
}) => {
  const q = query(
    collection(db, "order"),
    where(id, "==", user),
    orderBy("updatedAt", "desc")
  );
  const docSnap = await getDocs(q);
  const docData = docSnap.docs.map((doc) => doc.data());
  return docData;
};