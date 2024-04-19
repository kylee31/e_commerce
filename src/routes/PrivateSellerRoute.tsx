import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Navigate } from "react-router-dom";

const PrivateSellerRoute = ({ children }: { children: React.ReactNode }) => {
  //seller 구분하기 (isSeller값을 받아서 true이면 seller, 전제 조건 따로 확인 필요없음)
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfo).isSeller;
  if (!isSeller) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateSellerRoute;
