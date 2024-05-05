import ProductForm from "@/components/seller/ProductForm";
import useGetProductInfo from "@/hooks/useGetProductInfo";
import { ProductInputsType } from "@/types/ProductType";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { updateSellerProduct } from "@/services/productService";

const UpdateProduct = () => {
  const productId = useParams().id!;
  const { productInfo } = useGetProductInfo(productId);
  const { handleSubmit, register, setValue } = useForm<ProductInputsType>();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProductInputsType> = async (data, event) => {
    if (!productInfo) return;

    const isUpdateImgs = data.productImages === undefined ? false : true;
    const uploadImgsLength = isUpdateImgs
      ? data.productImages
      : productInfo.productImages;

    if (uploadImgsLength.length > 0) {
      setIsUploading(true);
      event?.preventDefault();
    } else {
      return;
    }

    try {
      await updateSellerProduct(data, productId, productInfo, isUpdateImgs);
      navigate("/seller", { replace: true });
    } catch (error) {
      console.log("error", error);
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
