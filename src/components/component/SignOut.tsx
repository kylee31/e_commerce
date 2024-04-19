import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    await navigate("/");
    localStorage.removeItem("token");
  };

  return <Button text="로그아웃" type="button" onClick={handleSignOut} />;
};

export default SignOut;
