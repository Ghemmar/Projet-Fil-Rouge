import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";


function Catalogue() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="p-6 text-center">Chargement...</p>;
  }

  if (status === "failed") {
    return <p className="p-6 text-center">Erreur chargement</p>;
  }

  const filteredProducts = items.filter((product) => {
    const matchCategory = category === "all" || product.category === category;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      {filteredProducts.length === 0 && search.trim() !== "" && (
        <p className="text-center text-gray-500 mt-6">
          Aucun résultat trouvé pour «{" "}
          <span className="font-semibold">{search}</span> ».
        </p>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          Catalogue ({filteredProducts.length})
        </h1>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded bg-white dark:bg-gray-800"
        >
          <option value="all">Tous</option>
          <option value="boitier">Boîtiers</option>
          <option value="clavier">Claviers</option>
          <option value="souris">Souris</option>
          <option value="ecran">Écrans</option>
          <option value="manette">Manettes</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded p-4 flex flex-col">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain"
              />
            </Link>

            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>

            <p className="font-bold mt-2">{product.price} €</p>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
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
