import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-900 dark:bg-black text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-yellow-400">
        TechZone
      </Link>

      <div className="flex items-center gap-6">
        <Link
          className="px-3 py-1 rounded hover:text-yellow-400 hover:bg-gray-700 transition"
          to="/cart"
        >
          Panier ({totalItems})
        </Link>

        <Link
          className="px-3 py-1 rounded hover:text-yellow-400 hover:bg-gray-700 transition"
          to="/admin"
        >
          Admin
        </Link>

        <DarkModeToggle/>
      </div>
    </header>
  );
}

export default Header;
