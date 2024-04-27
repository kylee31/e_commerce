import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StickyCart from "./components/StickyCart";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="z-10">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
        <StickyCart />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
