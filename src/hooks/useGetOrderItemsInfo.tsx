import { getOrderItems } from "@/services/orderService";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "@/services/context/UserProvider";

const useGetOrderItemsInfo = (id: string) => {
  const user = useUser();
  const [orderItems, setOrderItems] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getFirebaseOrderItems = async () => {
      const getItems = await getOrderItems({ id, user });
      setOrderItems(getItems);
    };
    getFirebaseOrderItems();
  }, [id, user]);

  return { orderItems };
};

export default useGetOrderItemsInfo;
