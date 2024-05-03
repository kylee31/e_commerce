import UserLink from "@/components/common/UserLink";
import SignOut from "@/components/login/SignOut";
import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  const userInfo = useUserInfo();
  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 h-full flex flex-col justify-start items-center bg-slate-200 px-5 ">
        <span className="font-bold my-7">
          {(userInfo as UserInfo).name}님 (판매자💁‍♂️)
        </span>
        <SignOut />
        <div className="w-full mt-10 flex flex-col">
          <UserLink href={""}>상품 관리</UserLink>
          <UserLink href={"order-management"}>주문 관리</UserLink>
        </div>
      </div>
      <div className="w-4/5 h-full flex flex-col items-center p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
