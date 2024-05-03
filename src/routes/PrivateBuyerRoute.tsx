import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Navigate, Outlet } from "react-router-dom";

const PrivateBuyerRoute = () => {
  const userInfo = useUserInfo();
  const isBuyer = !(userInfo as UserInfo).isSeller;
  const token = localStorage.getItem("token");

  if (token && isBuyer == undefined) {
    return null;
  }
  if (!isBuyer) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateBuyerRoute;
