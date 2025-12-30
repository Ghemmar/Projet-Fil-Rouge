import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

if (items.length === 0) {
  return (
    <div className="p-6 text-center">
      <p className="mb-4">Votre panier est vide </p>
      <Link to="/" className="underline">
        Retour au catalogue
      </Link>
    </div>
  );
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>

{items.map(item => (
  <div
    key={item.id}
    className="flex items-center justify-between border p-3 mb-3 rounded"
  >
    {/* IMAGE + NOM */}
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      <span className="font-semibold">{item.name}</span>
    </div>

    {/* QUANTITÉ */}
    <input
      type="number"
      min="1"
      value={item.quantity}
      onChange={e =>
        dispatch(
          updateQuantity({
            id: item.id,
            quantity: Number(e.target.value),
          })
        )
      }
      className="w-16 border p-1 text-center"
    />

    {/* PRIX */}
    <span className="font-bold">
      {item.price * item.quantity} €
    </span>

    {/* SUPPRIMER */}
    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-600"> X </button>
  </div>
))}


      <hr />

      <p className="mt-4 font-bold">Total : {total} €</p>

      <button
        onClick={() => dispatch(clearCart())}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Vider le panier
      </button>
    </div>
  );
}

export default Cart;
