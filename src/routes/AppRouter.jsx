import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogue from "../pages/Catalogue";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
