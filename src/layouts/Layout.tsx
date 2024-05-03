import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StickyCart from "../components/layout/StickyCart";
import { useUserInfo } from "@/services/UserProvider";
import { UserInfo } from "@/types/UserType";

const Layout = () => {
  const userInfo = useUserInfo();
  const location = useLocation();
  const isSeller = (userInfo as UserInfo).isSeller;
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
      <Footer />
    </div>
  );
};

export default Layout;
