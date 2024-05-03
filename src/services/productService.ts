import { db } from "@/firebase";
import { productInputs } from "@/types/ProductType";
import downloadUrl from "@/util/downloadUrl";
import {
  DocumentData,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
  const productInfo: productInputs = {
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
  const newProductInfo: productInputs = {
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
