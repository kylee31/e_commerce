import { auth, db } from "@/firebase";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const SellerProductContext = createContext<DocumentData[]>([]);

export const SellerProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sellerProduct, setSellerProduct] = useState<DocumentData[]>([]);
  const user = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "product"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newSellerProducts: DocumentData[] = [];
          snapshot.forEach((doc) => {
            if (doc.data().uid == user) {
              newSellerProducts.push(doc.data());
            }
          });
          const newData = [...sellerProduct, ...newSellerProducts].sort(
            (a, b) => a.name.localeCompare(b.name)
          );
          setSellerProduct(newData);
        });
        () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <SellerProductContext.Provider value={sellerProduct}>
      {children}
    </SellerProductContext.Provider>
  );
};

export const useSellerProduct = () => useContext(SellerProductContext);