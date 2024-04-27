import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="z-10">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
