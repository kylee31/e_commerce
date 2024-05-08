import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StickyCart from "../components/layout/StickyCart";
import { useUserInfo } from "@/services/context/UserProvider";
import { UserInfoType } from "@/types/UserType";

const MainLayout = () => {
  const userInfo = useUserInfo();
  const location = useLocation();
  const isSeller = (userInfo as UserInfoType).isSeller;
  const isBuyerPage = String(location.pathname).includes("buyer");

  return (
    <div className="flex flex-col h-screen">
      <header className="z-10">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
        {isSeller === false && !isBuyerPage && <StickyCart />}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
