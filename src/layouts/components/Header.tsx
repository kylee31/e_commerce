import { useUser, useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useUser();
  const userInfo = useUserInfo();
  const isUserType = (userInfo as UserInfo).isSeller;
  const navigate = useNavigate();

  const handlePage = () => {
    const userLink = user ? (isUserType ? "/seller" : "/buyer") : "/login";
    navigate(userLink);
  };

  return (
    <div className="w-full h-14 bg-gray-300 justify-between items-center flex flex-row px-7">
      <div className="text-black">Logo</div>
      <div className="flex flex-row">
        <img
          src="/imgs/user.png"
          alt=""
          onClick={handlePage}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;