import Button from "./Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { SignUpInputs } from "@/types/SignType";
import { SignUpInputData } from "@/services/data/SignData";

const INPUT_LIST = SignUpInputData;

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      //객체 리터럴 단축 속성명
      const { isSeller, name, nickname, email, password } = data;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      const userInfo = {
        uid: userId,
        isSeller,
        name,
        nickname,
        email,
        password,
      };
      await setDoc(doc(db, "user", userId), userInfo);
      await navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input type="checkbox" id="isSeller" {...register("isSeller")} />
          판매자로 회원가입 하시겠습니까?
        </label>
        {INPUT_LIST.map((ele, idx) => {
          return (
            <div
              key={`signup_${idx}`}
              className="w-full flex flex-col items-start"
            >
              <span>{ele.label}</span>
              <input
                type={ele.type}
                placeholder={ele.value}
                autoComplete="off"
                className="w-full border-gray-500 border rounded-sm"
                {...register(ele.value, ele.register)}
              />
              {errors[ele.value] && (
                <div className="text-red-400 text-xs">
                  {errors[ele.value]?.message}
                </div>
              )}
            </div>
          );
        })}
        <div className="mt-5">
          <Button type="submit" text="회원가입하기" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
