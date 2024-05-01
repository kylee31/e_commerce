import UserLink from "@/components/common/UserLink";
import SignOut from "@/components/login/SignOut";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  const userInfo = useUserInfo();

  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 h-full flex flex-col justify-start items-center bg-slate-200 p-5">
        <span className="font-bold my-4">
          {(userInfo as UserInfo).nickname}님, 환영합니다!
        </span>
        <SignOut />
        <div className="w-full mt-10 flex flex-col">
          <UserLink href={""}>장바구니</UserLink>
          <UserLink href={"order-list"}>구매 내역</UserLink>
        </div>
      </div>
      <div className="w-4/5 h-full flex flex-col items-center p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLayout;
