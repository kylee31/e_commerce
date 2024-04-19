import SignOut from "@/components/component/SignOut";
import Layout from "@/layouts/Layout";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Outlet } from "react-router-dom";

const Seller = () => {
  const userInfo = useUserInfo();
  return (
    <Layout>
      <div className="w-full h-full flex">
        <div className="w-1/5 h-full flex flex-col justify-center items-center bg-slate-200 p-5">
          {(userInfo as UserInfo).name}님(판매자)
          <SignOut />
        </div>
        <div className="w-4/5 h-full flex flex-col justify-center items-center p-8">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default Seller;
