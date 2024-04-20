import SignOut from "@/components/login/SignOut";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const Buyer = () => {
  const userInfo = useUserInfo();

  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 h-full flex flex-col justify-center items-center bg-slate-200 p-5">
        <span className="font-bold mb-3">
          {(userInfo as UserInfo).nickname}님, 환영합니다!
        </span>
        <SignOut />
      </div>
      <div className="w-4/5 h-full flex flex-col justify-center items-center">
        🙋‍♀️ 구매자 페이지
      </div>
    </div>
  );
};

export default Buyer;
