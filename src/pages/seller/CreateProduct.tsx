import ProductForm from "@/components/seller/ProductForm";
import { useUser } from "@/services/context/UserProvider";
import { createSellerProduct } from "@/services/productService";
import { ProductInputsType } from "@/types/ProductType";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const userId = useUser();
  const { handleSubmit, register, setValue } = useForm<ProductInputsType>();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProductInputsType> = async (data, event) => {
    if (!userId) return;

    if (data.productImages.length > 0) {
      setIsUploading(true);
      event?.preventDefault();
    } else {
      return;
    }

    try {
      await createSellerProduct(data, userId);
      navigate("/seller");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <ProductForm
      isUpdate={false}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      isUploading={isUploading}
    />
  );
};

export default CreateProduct;
