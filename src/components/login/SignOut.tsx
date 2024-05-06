import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    await auth.signOut();
    await navigate("/");
  };

  return (
    <Button className="w-full" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
};

export default SignOut;
