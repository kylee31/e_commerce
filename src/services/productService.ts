import { db, storage } from "@/firebase";
import { ProductInputsType } from "@/types/ProductType";
import downloadUrl from "@/util/downloadUrl";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export const createSellerProduct = async (
  productData: DocumentData,
  userId: string
) => {
  const nowDate = new Date();
  const {
    productName,
    productPrice,
    productQunatity,
    productDescription,
    productCategory,
    productImages,
  } = productData;

  const urls: string[] = [];
  const productRef = doc(collection(db, "product"));
  const productId = productRef.id;
  for (let idx = 0; idx < productImages.length; idx++) {
    const img = productImages[idx];
    const url = await downloadUrl({ img, productId, idx });
    urls.push(url);
  }
  const productInfo: ProductInputsType = {
    id: productId,
    sellerId: userId,
    productName,
    productPrice: Number(productPrice),
    productQunatity: Number(productQunatity),
    productDescription,
    productCategory,
    productImages: urls,
    createdAt: nowDate,
    updatedAt: nowDate,
  };
  await setDoc(productRef, productInfo);
};

export const updateSellerProduct = async (
  productData: DocumentData,
  productId: string,
  productInfo: DocumentData,
  isUpdateImgs: boolean
) => {
  const nowDate = new Date();
  const {
    productName,
    productCategory,
    productDescription,
    productImages,
    productPrice,
    productQunatity,
  } = productData;
  const urls: string[] = [];

  if (isUpdateImgs) {
    // 저장한 각 이미지의 다운로드 url 추가, 이미 다운로드 url로 변환된 파일이면 그대로 추가하기
    for (let idx = 0; idx < productImages.length; idx++) {
      const img = productImages[idx];
      if (img.includes("blob")) {
        const url = await downloadUrl({ img, idx, productId });
        urls.push(url);
      } else {
        urls.push(img);
      }
    }
  }
  const productRef = doc(db, "product", productId);
  const newProductInfo: ProductInputsType = {
    productName,
    productCategory,
    productPrice: Number(productPrice),
    productQunatity: Number(productQunatity),
    productDescription,
    //편집된게 있으면 수정한 url정보로, 그대로라면 기존 imgs 정보 세팅
    productImages: isUpdateImgs ? urls : productInfo.productImages,
    updatedAt: nowDate,
  };
  await updateDoc(productRef, newProductInfo);
};

export const deleteSellerProduct = async (
  productInfo: DocumentData | undefined
) => {
  if (!productInfo) return;
  const productRefId = productInfo.id;

  //상품 삭제 시 저장된 이미지도 삭제하기
  const deleteImages = () => {
    for (let i = 0; i < productInfo.productImages.length; i++) {
      const desertRef = ref(storage, `images/${productRefId}-${i}.webp`);
      deleteObject(desertRef);
    }
  };
  await deleteDoc(doc(db, "product", productRefId));
  await deleteImages();
};

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
