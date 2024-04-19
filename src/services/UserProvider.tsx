import { auth, db } from "@/firebase";
import { getDocs, collection, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const UserUidContext = createContext<string | null>(null);
const UserInfoContext = createContext({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({});
  //로그인 여부(uid) 받아오기
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser(authUser);
        setUserInfo({});
      }
    });
  }, []);
  //로그인 했다면 DB에서 해당 유저 정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "user"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.id == user) {
          setUserInfo(doc.data());
        }
      });
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
