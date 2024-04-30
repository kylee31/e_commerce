import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//blob string을 다운로드 url로 변경하기
const downloadUrl = async ({
  img,
  productId,
  idx,
}: {
  img: string;
  productId: string;
  idx: number;
}) => {
  const convertImg = await fetch(img).then((file) => file.blob());
  const storageRef = ref(storage, `images/${productId}-${idx}.png`);
  const uploadImg = await uploadBytes(storageRef, convertImg);
  const download = await getDownloadURL(uploadImg.ref);
  return download;
};

export default downloadUrl;
