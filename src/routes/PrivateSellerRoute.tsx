import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfoType } from "@/types/UserType";
import { Navigate, Outlet } from "react-router-dom";

const PrivateSellerRoute = () => {
  const userInfo = useUserInfo();
  const isSeller = (userInfo as UserInfoType).isSeller;
  const token = localStorage.getItem("token");

  if (token && isSeller === undefined) {
    return null;
  }
  if (!isSeller) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateSellerRoute;
