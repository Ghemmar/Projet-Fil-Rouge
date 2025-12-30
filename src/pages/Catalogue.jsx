import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

function Catalogue() {
  const dispatch = useDispatch();


  const { items, status } = useSelector(state => state.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // États de chargement
  if (status === "loading") {
  return (
    <div className="p-6 text-center font-semibold">
      Chargement des produits...
    </div>
  );
}

  if (status === "failed") return <p>Erreur chargement</p>;

  return (
    <div className="p-6">
    
      <Link to="/cart" className="underline mb-4 inline-block">
        Voir le panier
      </Link>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(product => (
          <div
            key={product.id}
            className="border p-4 rounded flex flex-col gap-2"
          >
          
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="h-40 object-cover cursor-pointer"
              />
            </Link>

            {/* NOM DU PRODUIT */}
            <h2 className="font-bold">{product.name}</h2>

            {/* PRIX */}
            <p>{product.price} €</p>

            {/* BOUTON PANIER */}
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
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
