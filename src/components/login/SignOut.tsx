import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SignOut = () => {
  const navigate = useNavigate();

  //TODO: 모든 탭 로그아웃 구현하기 (storage 변경 감지 이벤트)
  const handleSignOut = async () => {
    localStorage.removeItem("token");
    await auth.signOut();
    await localStorage.removeItem("cartItems");
    await navigate("/");
  };

  return (
    <Button className="w-full" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
};

export default SignOut;
