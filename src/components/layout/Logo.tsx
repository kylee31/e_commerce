import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  const handleClickNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="size-full" onClick={handleClickNavigateHome}>
      <img src="/imgs/logo.webp" alt="" width={70} height={58} />
    </div>
  );
};
export default Logo;
