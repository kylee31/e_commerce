import { isLogin } from "@/libs/isLogin";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  //TODO: seller, buyer 구분하기
  if (!isLogin()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
