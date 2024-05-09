import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useProductMutation = ({
  mutationFunction,
  nav,
  navOption,
}: {
  mutationFunction: any;
  nav?: string;
  navOption?: object;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (args: any) => mutationFunction({ ...args }),
    onMutate: (args: any) => {
      return { ...args };
    },
    onSuccess: (_, context) => {
      queryClient.invalidateQueries({
        queryKey: ["sellerProducts"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "PreviewProductAboutCategory",
          context.productData.productCategory,
        ],
        refetchType: "all",
      });
      nav && navigate(nav, navOption);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useProductMutation;
