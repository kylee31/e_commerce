import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/seller"
          element={
            <PrivateRoute>
              <>ddd</>
            </PrivateRoute>
          }
        />
        <Route path="/category/:cate" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
export default PageRouter;
