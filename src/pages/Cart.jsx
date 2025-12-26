import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <p className="p-6">Panier vide</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>

      {items.map(item => (
        <div key={item.id} className="flex justify-between mb-4">
          <span>{item.name}</span>

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
            className="w-16 border"
          />

          <span>{item.price * item.quantity} €</span>

          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500"
          >
            Supprimer
          </button>
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
