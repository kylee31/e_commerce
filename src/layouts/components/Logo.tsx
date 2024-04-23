import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="size-full" onClick={navigateHome}>
      <img src="/imgs/logo.png" alt="" width={70} height={40} />
    </div>
  );
};
export default Logo;
