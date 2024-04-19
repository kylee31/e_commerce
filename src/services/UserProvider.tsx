import { auth, db } from "@/firebase";
import { User } from "firebase/auth";
import { getDocs, collection, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type Token = User & {
  accessToken: string;
};

const UserUidContext = createContext<string | null>(null);
const UserInfoContext = createContext({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<object>({});

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("token", (authUser as Token).accessToken);
        setUser(authUser.uid);
      } else {
        setUser(authUser);
        setUserInfo({});
      }
    });
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "user"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.id == user) {
            setUserInfo(doc.data());
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <UserUidContext.Provider value={user}>
      <UserInfoContext.Provider value={userInfo}>
        {children}
      </UserInfoContext.Provider>
    </UserUidContext.Provider>
  );
};

export const useUser = () => useContext(UserUidContext);
export const useUserInfo = () => useContext(UserInfoContext);
