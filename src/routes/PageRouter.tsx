import { Route, Routes } from "react-router-dom";
import PrivateSellerRoute from "./PrivateSellerRoute";
import PrivateBuyerRoute from "./PrivateBuyerRoute";
import Seller from "@/pages/seller/Seller";
import Buyer from "@/pages/buyer/Buyer";
import ShowProduct from "@/pages/seller/ShowProduct";
import Layout from "@/layouts/Layout";
import AddProduct from "@/pages/seller/AddProduct";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const PageRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route path="" element={<Seller />}>
            <Route path="" element={<ShowProduct />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Route>
        <Route path="/buyer" element={<PrivateBuyerRoute />}>
          <Route path="" element={<Buyer />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
