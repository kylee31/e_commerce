import { useUser, useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useUser();
  const userInfo = useUserInfo();
  const isUser = (userInfo as UserInfo).isSeller;

  const userLink = user ? (isUser ? "/seller" : "/buyer") : "/login";

  return (
    <div className="w-full h-14 bg-gray-300 justify-between items-center flex flex-row px-5">
      <div className="text-black">Logo</div>
      <div className="flex flex-row">
        {isUser ? null : <img src="/imgs/cart.png" alt="" />}
        <Link to={userLink}>
          <img src="/imgs/user.png" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
