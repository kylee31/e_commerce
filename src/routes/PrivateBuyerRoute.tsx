import { useUser, useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Navigate, Outlet } from "react-router-dom";

const PrivateBuyerRoute = () => {
  //buyer 구분하기 (isSeller값을 받아서 false이면 buyer인데, 전제 조건으로 로그인한 상태인지 확인)
  const user = useUser();
  const userInfo = useUserInfo();
  const isBuyer = !(userInfo as UserInfo).isSeller;
  const token = localStorage.getItem("token");

  if (token && isBuyer == undefined) {
    return null;
  }
  if (user == null || !isBuyer) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateBuyerRoute;
