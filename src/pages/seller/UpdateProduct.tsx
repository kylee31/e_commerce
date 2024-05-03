import ProductForm from "@/components/seller/ProductForm";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { productInputs } from "@/types/ProductType";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { updateSellerProduct } from "@/services/productService";

const UpdateProduct = () => {
  const productId = useParams().id!;
  const { productInfo } = useGetProductInfo(productId);
  const { handleSubmit, register, setValue } = useForm<productInputs>();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<productInputs> = async (data, event) => {
    const isUpdateImgs = data.productImages === undefined ? false : true;

    if (productInfo) {
      const uploadImgsLength = isUpdateImgs
        ? data.productImages
        : productInfo.productImages;

      if (uploadImgsLength.length > 0) {
        setIsUploading(true);
        event?.preventDefault();
      } else {
        return;
      }
      await updateSellerProduct(data, productId, productInfo, isUpdateImgs);
      navigate("/seller", { replace: true });
    }
  };

  return (
    <ProductForm
      isUpdate={true}
      updateProduct={productInfo}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      isUploading={isUploading}
    />
  );
};

export default UpdateProduct;
