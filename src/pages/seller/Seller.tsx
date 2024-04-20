import SignOut from "@/components/login/SignOut";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Outlet } from "react-router-dom";

const Seller = () => {
  const userInfo = useUserInfo();
  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 h-full flex flex-col justify-center items-center bg-slate-200 p-5 ">
        <span className="font-bold mb-3">
          {(userInfo as UserInfo).name}님(판매자)
        </span>
        <SignOut />
      </div>
      <div className="w-4/5 h-full flex flex-col justify-center items-center px-8 pt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Seller;
