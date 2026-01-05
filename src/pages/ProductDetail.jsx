import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function ProductDetail() {
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
        className="mt-2 px-4 py-2 rounded font-semibold bg-yellow-400 text-black hover:bg-yellow-700 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        Retour catalogue
      </Link>

      <img src={product.image} alt={product.name} className="w-64 my-4" />

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="my-2">{product.description}</p>
      <p className="font-bold">{product.price} €</p>
    </div>
  );
}

export default ProductDetail;
