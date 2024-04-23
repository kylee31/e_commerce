import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { AccountInputs } from "@/types/SignType";
import { AccountInputData } from "@/services/data/SignData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const INPUT_LIST = AccountInputData;

const Account = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AccountInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AccountInputs> = async (data) => {
    const [userEmail, userPassword] = [data["email"], data["password"]];
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const userOperationType = userSignIn.operationType;
      userOperationType && (await navigate("/"));
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="text-red-400 text-xs mt-1">
                  {errors[ele.value]?.message}
                </div>
              )}
            </div>
          );
        })}
        <div className="mt-5">
          <Button className="w-full" type="submit">
            로그인하기
          </Button>
        </div>
      </form>
      <hr className="my-5 border-black" />
      <span className="text-xs font-bold">회원가입 없이 한번에!</span>
      {/*TODO:소셜 로그인*/}
      <div className="w-full border-2 mt-5">소셜 로그인</div>
    </div>
  );
};
export default Account;
