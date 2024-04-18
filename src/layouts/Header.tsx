import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-14 bg-gray-300 justify-between items-center flex flex-row px-5">
      <div className="text-black">Logo</div>
      <div className="flex flex-row">
        <Link to="/login">
          <img src="/imgs/user.png" alt="" />
        </Link>
        <img src="/imgs/cart.png" alt="" />
      </div>
    </div>
  );
};

export default Header;
