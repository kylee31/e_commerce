import { auth, db } from "@/firebase";
import { AccountInputsType, SignUpInputsType } from "@/types/SignType";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signInUser = async (data: AccountInputsType) => {
  const [userEmail, userPassword] = [data.email, data.password];
  const userSignIn = await signInWithEmailAndPassword(
    auth,
    userEmail,
    userPassword
  );
  const userOperationType = userSignIn.operationType;
  return { userOperationType };
};

export const signUpUser = async (
  data: SignUpInputsType,
  checkedBox: boolean
) => {
  const nowDate = new Date();
  const { email, name, nickname, password } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userId = userCredential.user.uid;
  const userInfo = {
    uid: userId,
    email,
    isSeller: checkedBox,
    name,
    nickname,
    password,
    createdAt: nowDate,
    updatedAt: nowDate,
  };
  await setDoc(doc(db, "user", userId), userInfo);
};
