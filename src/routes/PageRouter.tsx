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
import changePathname from "@/util/changePathname";
import ReadCartItems from "@/pages/buyer/ReadCartItems";
import OrderCartItems from "@/pages/buyer/OrderCartItems";
import OrderManagement from "@/pages/seller/OrderManagement";
import OrderSheet from "@/pages/buyer/OrderSheet";

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
        {/*판매자 private*/}
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route element={<SellerLayout />}>
            <Route path="" element={<ReadProduct />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="order-management" element={<OrderManagement />} />
          </Route>
        </Route>
        {/*구매자 private*/}
        <Route path="/buyer" element={<PrivateBuyerRoute />}>
          <Route element={<BuyerLayout />}>
            <Route path="" element={<ReadCartItems />} />
            <Route path="order-list" element={<OrderCartItems />} />
            <Route path="order-sheet" element={<OrderSheet />} />
          </Route>
        </Route>
      </Route>
      {/*레이아웃 미적용*/}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
