import { Routes, Route } from "react-router-dom";
import Catalogue from "../pages/Catalogue";
import Cart from "../pages/Cart";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetail";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default AppRouter;
