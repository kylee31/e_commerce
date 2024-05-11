import { Route, Routes, useLocation } from "react-router-dom";
import PrivateSellerRoute from "./PrivateSellerRoute";
import PrivateBuyerRoute from "./PrivateBuyerRoute";
import SellerLayout from "@/layouts/SellerLayout";
import BuyerLayout from "@/layouts/BuyerLayout";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Category from "@/pages/category/Category";
import DetailProduct from "@/pages/product/DetailProduct";
import Login from "@/pages/Login";
import changePathname from "@/util/changePathname";
import { Suspense, lazy, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import {
  useCategoryProductEnabledAction,
  usePreviewProductEnabledAction,
} from "@/services/stores/productEnableStore";

const PageRouter = () => {
  const CreateProduct = lazy(() => import("@/pages/seller/CreateProduct"));
  const ReadProduct = lazy(() => import("@/pages/seller/ReadProduct"));
  const UpdateProduct = lazy(() => import("@/pages/seller/UpdateProduct"));
  const EditProduct = lazy(() => import("@/pages/seller/EditProduct"));
  const OrderManagement = lazy(() => import("@/pages/seller/OrderManagement"));
  const ReadCartItems = lazy(() => import("@/pages/buyer/ReadCartItems"));
  const OrderCartItems = lazy(() => import("@/pages/buyer/OrderCartItems"));
  const OrderSheet = lazy(() => import("@/pages/buyer/OrderSheet"));
  const location = useLocation();

  const setPreviewProductEnabled = usePreviewProductEnabledAction();
  const setCategoryProductEnabled = useCategoryProductEnabledAction();

  useEffect(() => {
    changePathname(location.pathname);
  }, [location]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "product"), () => {
      setPreviewProductEnabled(true);
      setCategoryProductEnabled(true);
    });
    return () => unsubscribe();
  }, [setPreviewProductEnabled, setCategoryProductEnabled]);

  return (
    <Routes>
      {/*레이아웃 적용*/}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:cate" element={<Category />} />
        <Route path="/category/:cate/:id" element={<DetailProduct />} />
        {/*판매자 private*/}
        <Route path="/seller" element={<PrivateSellerRoute />}>
          <Route element={<SellerLayout />}>
            <Route
              path=""
              element={
                <Suspense fallback={<></>}>
                  <ReadProduct />
                </Suspense>
              }
            />
            <Route
              path="create-product"
              element={
                <Suspense fallback={<></>}>
                  <CreateProduct />
                </Suspense>
              }
            />
            <Route
              path="edit-product/:id"
              element={
                <Suspense fallback={<></>}>
                  <EditProduct />
                </Suspense>
              }
            />
            <Route
              path="update-product/:id"
              element={
                <Suspense fallback={<></>}>
                  <UpdateProduct />
                </Suspense>
              }
            />
            <Route
              path="order-management"
              element={
                <Suspense fallback={<></>}>
                  <OrderManagement />
                </Suspense>
              }
            />
          </Route>
        </Route>
        {/*구매자 private*/}
        <Route path="/buyer" element={<PrivateBuyerRoute />}>
          <Route element={<BuyerLayout />}>
            <Route
              path=""
              element={
                <Suspense fallback={<></>}>
                  <ReadCartItems />
                </Suspense>
              }
            />
            <Route
              path="order-list"
              element={
                <Suspense fallback={<></>}>
                  <OrderCartItems />
                </Suspense>
              }
            />
            <Route
              path="order-sheet"
              element={
                <Suspense fallback={<></>}>
                  <OrderSheet />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
      {/*레이아웃 미적용*/}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
