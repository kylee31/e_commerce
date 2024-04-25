import { useParams } from "react-router-dom";

const Category = () => {
  const categoryId = useParams().cate;
  return <div>{categoryId}</div>;
};
export default Category;
