import { Route, Routes, useLocation } from "react-router-dom";
import PrivateSellerRoute from "./PrivateSellerRoute";
import PrivateBuyerRoute from "./PrivateBuyerRoute";
import SellerLayout from "@/layouts/SellerLayout";
import BuyerLayout from "@/layouts/BuyerLayout";
import ReadProduct from "@/pages/seller/ReadProduct";
import Layout from "@/layouts/Layout";
import CreateProduct from "@/pages/seller/CreateProduct";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import EditProduct from "@/pages/seller/EditProduct";
import { useEffect } from "react";
import UpdateProduct from "@/pages/seller/UpdateProduct";
import Category from "@/pages/category/Category";
import DetailProduct from "@/pages/product/DetailProduct";
import Pre from "@/pages/Pre";
import changePathname from "@/util/changePathname";

const PageRouter = () => {
  const location = useLocation();

  useEffect(() => {
    changePathname(location.pathname);
  }, [location]);

  return (
    <Routes>
      {/*레이아웃 적용*/}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:cate" element={<Category />} />
        <Route path="/category/:cate/:id" element={<DetailProduct />} />
        <Route path="/pre" element={<Pre />} />
        {/*판매자 private*/}
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route path="" element={<SellerLayout />}>
            <Route path="" element={<ReadProduct />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>
        {/*구매자 private*/}
        <Route path="/buyer" element={<PrivateBuyerRoute />}>
          <Route path="" element={<BuyerLayout />}>
            {/*TODO: 추가하기*/}
          </Route>
        </Route>
      </Route>
      {/*레이아웃 미적용*/}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
