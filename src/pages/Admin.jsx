import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { Power } from 'lucide-react';

function Admin() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description);
    setCategory(product.category || "");
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: Number(price),
      image,
      description,
      category,
    };

    if (editingId) {
      api.put(`/products/${editingId}`, productData).then((res) => {
        setProducts(products.map((p) => (p.id === editingId ? res.data : p)));
        resetForm();
      });
    } else {
      api.post("/products", productData).then((res) => {
        setProducts([...products, res.data]);
        resetForm();
      });
    }
  };

  const handleDelete = (id) => {
    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-6">
      <button
        onClick={() => {
          localStorage.removeItem("isAuth");
          window.location.href = "/login";
        }}
        className="text-red-600 underline mb-4">
         <Power />
      </button>

      <div className="max-w-md mx-auto">


        <h1 className="text-2xl font-bold my-4">Gestion des produits</h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border p-3 rounded text-center">
            <p className="text-gray-500">Produits</p>
            <p className="text-xl font-bold">{products.length}</p>
          </div>

          <div className="border p-3 rounded text-center">
            <p className="text-gray-500">Articles panier</p>
            <p className="text-xl font-bold">{totalItems}</p>
          </div>

          <div className="border p-3 rounded text-center">
            <p className="text-gray-500">Total panier</p>
            <p className="text-xl font-bold">{totalPrice.toFixed(2)} €</p>
          </div>
        </div>

        {editingId && (
          <button onClick={resetForm} className="text-gray-500 underline mt-2">
            Annuler modification
          </button>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-2 max-w-md"
        >
          <input
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
            required
          />

          <input
            type="number"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2"
            required
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
            required
          />

          <input
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2"
          />

          <button className="bg-green-600 text-white p-2 rounded">
            {editingId ? "Mettre à jour" : "Ajouter produit"}
          </button>
        </form>

        <h2 className="font-bold mb-4">Produits</h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <span>
              {product.name} — {product.price} € — {product.category}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600"
              >
                Modifier
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
