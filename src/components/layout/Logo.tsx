import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  const handleClickNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="size-full" onClick={handleClickNavigateHome}>
      <img src="/imgs/logo.png" alt="" width={70} height={40} />
    </div>
  );
};
export default Logo;
