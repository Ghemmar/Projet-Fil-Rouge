import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../api/axios";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

function ProductDetail() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return <p className="p-6 text-center font-semibold">Erreur produit</p>;
  if (!product) {
    return (
      <div className="p-6 text-center font-semibold">
        Chargement du produit...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Link
        to="/"
        className="mt-2 px-4 py-2 rounded font-semibold bg-yellow-400 text-black hover:bg-yellow-700 active:scale-95 transition-all duration-200 cursor-pointer inline-block mb-6"
      >
        Retour catalogue
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm object-contain rounded border p-2 bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="mb-4">
              {product.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="text-xl font-bold">{product.price} €</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-transform active:scale-95"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
