import { DocumentData } from "firebase/firestore";
import Product from "../product/Product";

const ProductItem = ({ productInfo }: { productInfo: DocumentData }) => {
  return (
    <>
      <Product productInfo={productInfo} />
    </>
  );
};

export default ProductItem;
