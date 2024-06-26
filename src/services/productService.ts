import { db, storage } from "@/firebase";
import { ProductInputsType } from "@/types/ProductType";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob) =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "WEBP",
      70,
      0, // rotation
      (uri) => res(uri), // responseUriFunc
      "blob" // outputType : Can be either base64, blob or file.(Default type is base64)
    );
  });

export const convertBlobToDownloadURL = async ({
  img,
  productId,
  idx,
}: {
  img: string;
  productId: string;
  idx: number;
}) => {
  const convertImg = await fetch(img).then((file) => file.blob()); //blob string을 blob객체로 변환
  const resizingImg = (await resizeFile(convertImg)) as Blob; //이미지 리사이징
  const storageRef = ref(storage, `images/${productId}-${idx}`);
  const uploadImg = await uploadBytes(storageRef, resizingImg);
  const download = await getDownloadURL(uploadImg.ref);
  return download;
};

export const createSellerProduct = async ({
  productData,
  userId,
}: {
  productData: DocumentData;
  userId: string;
}) => {
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
    const url = await convertBlobToDownloadURL({ img, productId, idx });
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

export const updateSellerProduct = async ({
  productData,
  productId,
  productInfo,
  isUpdateImgs,
}: {
  productData: DocumentData;
  productId: string;
  productInfo: DocumentData;
  isUpdateImgs: boolean;
}) => {
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
        const url = await convertBlobToDownloadURL({ img, idx, productId });
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

export const deleteSellerProduct = async ({
  productData,
}: {
  productData: DocumentData | undefined;
}) => {
  if (!productData) return;
  const productRefId = productData.id;

  //TODO:seller가 상품 이미지 삭제 시 storage에 저장된 이미지도 삭제하기
  const deleteImages = () => {
    for (let i = 0; i < productData.productImages.length; i++) {
      const desertRef = ref(storage, `images/${productRefId}-${i}`);
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

export const getProductAboutCategorySnap = async (cate: string) => {
  const q = query(
    collection(db, "product"),
    where("productCategory", "==", cate),
    orderBy("updatedAt", "desc"),
    limit(4)
  );
  const docSnap = await getDocs(q);
  return docSnap;
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
