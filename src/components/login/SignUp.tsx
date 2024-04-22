import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { SignUpInputs } from "@/types/SignType";
import { SignUpInputData } from "@/services/data/SignData";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

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
      <form className="mb-16" onSubmit={handleSubmit(onSubmit)}>
        {INPUT_LIST.map((ele, idx) => {
          return (
            <div
              key={`signup_${idx}`}
              className="w-full flex flex-col items-start mb-3"
            >
              <Label className="mb-2">{ele.label}</Label>
              <Input
                type={ele.type}
                placeholder={ele.value}
                autoComplete="off"
                className="w-full border-gray-500 border rounded-sm"
                {...register(ele.value, ele.register)}
              />
              {errors[ele.value] && (
                <div className="text-red-400 text-xs  mt-1">
                  {errors[ele.value]?.message}
                </div>
              )}
            </div>
          );
        })}
        <div className="items-top justify-center flex">
          <Checkbox className="mr-1" id="isSeller" {...register("isSeller")} />
          <Label htmlFor="isSeller">판매자로 회원가입 하시겠습니까?</Label>
        </div>
        <div className="mt-5">
          <Button className="w-full" type="submit">
            회원가입하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
