import { getOrderItemsSnap } from "@/services/orderService";
import { useUser } from "@/services/context/UserProvider";
import { useQuery } from "@tanstack/react-query";

const useGetOrderItemsInfo = (id: string) => {
  const user = useUser();
  const { data: orderItems, isLoading } = useQuery({
    queryKey: ["orderItems", user],
    queryFn: async () => {
      const getItems = await getOrderItemsSnap({ id, user });
      const getItemsData = getItems.docs.map((doc) => doc.data());
      return getItemsData;
    },
  });

  return { orderItems, isLoading };
};

export default useGetOrderItemsInfo;
