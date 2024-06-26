import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfoType } from "@/types/UserType";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import CartList from "@/components/cart/CartList";

const Header = () => {
  const token = localStorage.getItem("token");
  const userInfo = useUserInfo();
  const isUserType = (userInfo as UserInfoType).isSeller;
  const navigate = useNavigate();

  const handleNavigatePage = () => {
    const userLink = token ? (isUserType ? "/seller" : "/buyer") : "/login";
    navigate(userLink);
  };

  return (
    <div className="w-full h-14 bg-gray-300 justify-between items-center flex flex-row px-7">
      <div className="pt-5">
        <Logo />
      </div>
      <div className="flex flex-row">
        <CartList />
        <img
          src="/imgs/user.webp"
          alt=""
          onClick={handleNavigatePage}
          className="hover:cursor-pointer ml-7"
        />
      </div>
    </div>
  );
};

export default Header;
