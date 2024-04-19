import SignOut from "@/components/component/SignOut";
import Layout from "@/layouts/Layout";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const Buyer = () => {
  const userInfo = useUserInfo();

  return (
    <Layout>
      <div className="w-full h-full flex">
        <div className="w-1/5 h-full flex flex-col justify-center items-center bg-slate-200 p-5">
          {(userInfo as UserInfo).nickname}님, 환영합니다!
          <SignOut />
        </div>
        <div className="w-4/5 h-full flex flex-col justify-center items-center">
          🙋‍♀️ 구매자 페이지
        </div>
      </div>
    </Layout>
  );
};

export default Buyer;
