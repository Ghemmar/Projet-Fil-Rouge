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
      .then(res => setProduct(res.data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p>Erreur produit</p>;
  if (!product) {
  return (
    <div className="p-6 text-center font-semibold">
      Chargement du produit...
    </div>
  );
}


  return (
    <div className="p-6">
      <Link to="/" className="underline">
        ← Retour catalogue
      </Link>

      <img
        src={product.image}
        alt={product.name}
        className="w-64 my-4"
      />

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="my-2">{product.description}</p>
      <p className="font-bold">{product.price} €</p>
    </div>
  );
}

export default ProductDetail;
