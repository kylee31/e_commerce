import { Route, Routes, useLocation } from "react-router-dom";
import PrivateSellerRoute from "./PrivateSellerRoute";
import PrivateBuyerRoute from "./PrivateBuyerRoute";
import Seller from "@/pages/seller/Seller";
import Buyer from "@/pages/buyer/Buyer";
import ReadProduct from "@/pages/seller/ReadProduct";
import Layout from "@/layouts/Layout";
import CreateProduct from "@/pages/seller/CreateProduct";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import EditProduct from "@/pages/seller/EditProduct";
import { useEffect } from "react";
import UpdateProduct from "@/pages/seller/UpdateProduct";

const PageRouter = () => {
  const location = useLocation();

  useEffect(() => {
    const locName = () => {
      const path = location.pathname.split("/");
      if (path[2] == "edit-product") {
        return "edit-product";
      }
      if (path[2] == "update-product") {
        return "update-product";
      }
      return path[path.length - 1] !== "" ? path[path.length - 1] : "home";
    };
    document.title = `${locName()} | Logo`;
  }, [location.pathname]);

  return (
    <Routes>
      {/*레이아웃 적용*/}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/*TODO: private 라우팅 더 좋은 방법 있는지 고민해보기*/}
        {/*판매자 private*/}
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route path="" element={<Seller />}>
            <Route path="" element={<ReadProduct />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>
        {/*구매자 private*/}
        <Route path="/buyer" element={<PrivateBuyerRoute />}>
          <Route path="" element={<Buyer />} />
        </Route>
      </Route>
      {/*레이아웃 미적용*/}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
