import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../common/Button";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { AccountInputs } from "@/types/SignType";
import { AccountInputData } from "@/services/data/SignData";

const INPUT_LIST = AccountInputData;

const Account = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AccountInputs>();

  const navigate = useNavigate();

  //TODO: 로그인 실패 시 알림 창 띄워주기
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
          <Button type="submit" text="로그인하기" />
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
