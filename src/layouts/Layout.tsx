import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
