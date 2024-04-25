import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";

export const deleteFirebaseData = async (
  productInfo: DocumentData | undefined
) => {
  if (productInfo) {
    const productRefId = productInfo.id;

    //상품 삭제 시 저장된 이미지도 삭제하기
    const deleteImages = () => {
      for (let i = 0; i < productInfo.productImages.length; i++) {
        const desertRef = ref(storage, `images/${productRefId}-${i}.png`);
        deleteObject(desertRef);
      }
    };
    await deleteDoc(doc(db, "product", productRefId));
    await deleteImages();
  }
};
