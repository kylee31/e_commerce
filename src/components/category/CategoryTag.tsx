import { useNavigate } from "react-router-dom";

const CategoryTag = ({ tag }: { tag: string }) => {
  const navigate = useNavigate();

  const handleClickCategoryTag = () => {
    navigate(`/category/${tag}`);
  };

  return (
    <div
      className="w-full h-10 rounded-3xl border-black border-2 flex justify-center items-center font-semibold"
      onClick={handleClickCategoryTag}
    >
      <>{tag}</>
    </div>
  );
};

export default CategoryTag;
