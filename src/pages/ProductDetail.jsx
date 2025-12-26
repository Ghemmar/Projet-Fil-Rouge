import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(state =>
    state.products.items.find(p => p.id == id)
  );

  if (!product) return <p>Produit introuvable</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="font-bold">{product.price} €</p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductDetail;
