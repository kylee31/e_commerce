import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateSellerRoute from "./PrivateSellerRoute";
import PrivateBuyerRoute from "./PrivateBuyerRoute";
import Seller from "@/pages/Seller";
import Buyer from "@/pages/Buyer";
import Product from "@/pages/Product";
import ShowProduct from "@/components/component/ShowProduct";

//TODO: 중첩 라우팅

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route path="" element={<Seller />}>
            <Route path="" element={<ShowProduct />} />
            <Route path="add-product" element={<Product />} />
          </Route>
        </Route>
        <Route
          path="/buyer"
          element={
            <PrivateBuyerRoute>
              <Buyer />
            </PrivateBuyerRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRouter;
