import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function Catalogue() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="p-6 text-center font-semibold">
        Chargement des produits...
      </div>
    );
  }

  if (status === "failed")
    return <p className="p-6 text-center font-semibold">Erreur chargement</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
        text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items
          .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div
              key={product.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded flex flex-col gap-2 transition"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="h-40 object-cover cursor-pointer"
                />
              </Link>

              <h2 className="font-bold">{product.name}</h2>
              <p>{product.price} €</p>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-2 px-4 py-2 rounded font-semibold bg-yellow-400 text-black hover:bg-yellow-700 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Catalogue;
