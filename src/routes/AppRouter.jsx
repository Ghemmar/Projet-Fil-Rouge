import { Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetail";
import Catalogue from './../pages/Catalogue';
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default AppRouter;
