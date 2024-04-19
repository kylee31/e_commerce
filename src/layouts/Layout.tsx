import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
