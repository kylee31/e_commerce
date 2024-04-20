import Account from "@/components/login/Account";
import SignUp from "@/components/login/SignUp";
import { useState } from "react";

const Login = () => {
  const [isToggle, setIsToggle] = useState(true);

  const handleIsAccount = () => {
    setIsToggle(true);
  };

  const handleIsSignup = () => {
    setIsToggle(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="mb-5">Logo</div>
      <div className="flex flex-col justify-start items-center w-96 h-96">
        <div className="w-full h-10 flex justify-center items-center mb-5">
          <span
            onClick={handleIsAccount}
            className={`w-1/2 hover:cursor-pointer border-b-2 pb-2 ${
              isToggle ? "border-gray-500" : "border-gray-200"
            }`}
          >
            로그인
          </span>
          <span
            onClick={handleIsSignup}
            className={`w-1/2 hover:cursor-pointer border-b-2 pb-2 ${
              isToggle ? "border-gray-200" : "border-gray-500"
            }`}
          >
            회원가입
          </span>
        </div>
        {isToggle ? <Account /> : <SignUp />}
      </div>
    </div>
  );
};

export default Login;
