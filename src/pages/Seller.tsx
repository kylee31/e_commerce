import Button from "@/components/component/Button";
import { auth } from "@/firebase";
import Layout from "@/layouts/Layout";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { useNavigate } from "react-router-dom";

const Seller = () => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await auth.signOut();
    await navigate("/");
  };

  return (
    <Layout>
      <div className="w-full h-full flex">
        <div className="w-1/5 h-full flex flex-col justify-center items-center bg-slate-200 p-5">
          {(userInfo as UserInfo).name}님(판매자)
          <Button text="로그아웃" type="button" onClick={handleSignOut} />
        </div>
        <div className="w-4/5 h-full flex flex-col justify-center items-center">
          💁‍♂️ 판매자 페이지
        </div>
      </div>
    </Layout>
  );
};

export default Seller;
