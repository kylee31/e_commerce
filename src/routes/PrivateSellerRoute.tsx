import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Navigate, Outlet } from "react-router-dom";

const PrivateSellerRoute = () => {
  //seller 구분하기 (isSeller값을 받아서 true이면 seller, 전제 조건 따로 확인 필요없음)
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfo).isSeller;
  const token = localStorage.getItem("token");

  if (token && isSeller === undefined) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  } else if (!isSeller) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateSellerRoute;
