import { db } from "@/firebase";
import { CartItemsType } from "@/types/CartType";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const cancleBuyerOrderStatus = async ({
  item,
}: {
  item: DocumentData;
}) => {
  const nowDate = new Date();
  try {
    const productInfo = await getDoc(doc(db, "product", item.productId)).then(
      (doc) => doc.data()
    );
    const orderDocRef = doc(db, "order", item.id);
    const productDocRef = doc(db, "product", item.productId);
    await updateDoc(orderDocRef, { Status: "CANCLED", updatedAt: nowDate });
    await updateDoc(productDocRef, {
      productQunatity:
        (productInfo as DocumentData).productQunatity + item.productQunatity,
    });
  } catch (error) {
    console.log("cancleBuyerOrderStatus", error);
  }
};

export const editOrderStatus = async ({
  item,
  changeOrderStatus,
  setProductOrderStatus,
  setIsEditOrderStatus,
}: {
  item: DocumentData;
  changeOrderStatus: string;
  setProductOrderStatus: React.Dispatch<any>;
  setIsEditOrderStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const nowDate = new Date();
  try {
    const docRef = doc(db, "order", item.id);
    await setProductOrderStatus(changeOrderStatus);
    await updateDoc(docRef, {
      Status: changeOrderStatus,
      updatedAt: nowDate,
    }).then(() => {
      setIsEditOrderStatus(false);
    });
    if (changeOrderStatus === "CANCLED") {
      const productInfo = await getDoc(doc(db, "product", item.productId)).then(
        (doc) => doc.data()
      );
      const productDocRef = doc(db, "product", item.productId);
      await updateDoc(productDocRef, {
        productQunatity:
          (productInfo as DocumentData).productQunatity + item.productQunatity,
      });
    }
  } catch (error) {
    console.log("editOrderStatus", error);
  }
};

export const postFirebaseOrderItems = async ({
  cartItems,
  cartItemsCount,
  userId,
  merchant_uid,
}: {
  cartItems: object[];
  cartItemsCount: number[];
  userId: string;
  merchant_uid: string;
}) => {
  const nowDate = new Date();
  cartItems.forEach(async (item: DocumentData, idx) => {
    const cartItemsRef = doc(collection(db, "order"));
    const cartItemsId = cartItemsRef.id;
    const buyerCartItems: CartItemsType = {
      merchantUid: merchant_uid,
      id: cartItemsId,
      sellerId: item.sellerId,
      buyerId: userId,
      productId: item.id,
      productName: item.productName,
      productTotalPrice: item.productPrice * cartItemsCount[idx],
      productQunatity: cartItemsCount[idx],
      Status: "PROCESSING",
      createdAt: nowDate,
      updatedAt: nowDate,
    };
    await setDoc(cartItemsRef, buyerCartItems);
  });
};

export const cancleBuyerPaymentProcess = ({
  cartItems,
}: {
  cartItems: object[];
}) => {
  cartItems.forEach(async (item: DocumentData) => {
    const docRef = doc(db, "product", item.id);
    await updateDoc(docRef, { productQunatity: item.productQunatity });
  });
};

export const updateFirebaseOrderItemsCount = async ({
  cartItems,
  cartItemsCount,
}: {
  cartItems: object[];
  cartItemsCount: number[];
}) => {
  try {
    //TODO: 결제 전 재고 변동 사항 업데이트 시 남은 수량 있는지 확인하고 재고 부족 시 알림창 띄우는 로직 추가하기
    let result = false;
    for (let idx = 0; idx < cartItems.length; idx++) {
      const item = cartItems[idx] as DocumentData;
      const productRef = doc(db, "product", item.id);
      const NewProductInfo = await getDoc(productRef).then((doc) => doc.data());
      const isSoldOut =
        (NewProductInfo as DocumentData).productQunatity - cartItemsCount[idx] <
        0;
      if (isSoldOut) {
        result = true;
      } else {
        await updateDoc(productRef, {
          productQunatity: item.productQunatity - cartItemsCount[idx],
        });
      }
    }
    return result;
  } catch (error) {
    console.log("updateFirebaseOrderItemsCount", error);
  }
};

export const getOrderItemsSnap = async ({
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
  return docSnap;
};
