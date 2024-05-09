import ProductForm from "@/components/seller/ProductForm";
import { useUser } from "@/services/context/UserProvider";
import { createSellerProduct } from "@/services/productService";
import { ProductInputsType } from "@/types/ProductType";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useProductMutation from "@/hooks/useProductMutation";

const CreateProduct = () => {
  const userId = useUser();
  const { handleSubmit, register, setValue } = useForm<ProductInputsType>();
  const [isUploading, setIsUploading] = useState(false);
  const createProductMutation = useProductMutation({
    mutationFunction: createSellerProduct,
    nav: "/seller",
  });

  const onSubmit: SubmitHandler<ProductInputsType> = async (data, event) => {
    if (!userId) return;

    if (data.productImages.length > 0) {
      setIsUploading(true);
      event?.preventDefault();
    } else {
      return;
    }

    try {
      createProductMutation.mutateAsync({ productData: data, userId });
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
