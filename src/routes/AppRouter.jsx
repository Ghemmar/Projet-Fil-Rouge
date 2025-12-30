import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogue from "../pages/Catalogue";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Admin from "../pages/Admin";
import Login from "../pages/login";
import ProtectedRoute from './../components/ProtectedRoute';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
     
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
        <ProtectedRoute>
        <Admin />
        </ProtectedRoute>}/>  

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
