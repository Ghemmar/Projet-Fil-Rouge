import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Admin() {
  const [products, setProducts] = useState([]);

  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  
  const [editingId, setEditingId] = useState(null);

  
  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

 
  const handleEdit = product => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description);
  };

  
  const handleSubmit = e => {
    e.preventDefault();

    const productData = {
      name,
      price: Number(price),
      image,
      description,
    };

  
    if (editingId) {
      api.put(`/products/${editingId}`, productData).then(res => {
        setProducts(
          products.map(p =>
            p.id === editingId ? res.data : p
          )
        );
        setEditingId(null);
      });
    }
    
    else {
      api.post("/products", productData).then(res => {
        setProducts([...products, res.data]);
      });
    }

    
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  
  const handleDelete = id => {
    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  return (
    <div className="p-6">
      <button
  onClick={() => {
    localStorage.removeItem("isAuth");
    window.location.href = "/login";
  }}
  className="text-red-600 underline mb-4"
>
  Se déconnecter
</button>

        <div className="max-w-md mx-auto">
      <Link to="/" className="underline">
         Retour catalogue
      </Link>

      <h1 className="text-2xl font-bold my-4">Gestion des produits</h1>

      {/* FORMULAIRE */}
      {editingId && (
  <button
    onClick={() => {
      setEditingId(null);
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
    }}
    className="text-gray-500 underline mt-2"
  >
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
          onChange={e => setName(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-2"
          required
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="border p-2"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2"
          required
        />

        <button className="bg-green-600 text-white p-2 rounded">
          {editingId ? "Mettre à jour" : "Ajouter produit"}
        </button>
      </form>

      
      <h2 className="font-bold mb-4">Produits</h2>

      {products.map(product => (
        <div
          key={product.id}
          className="flex justify-between items-center border p-2 mb-2"
        >
          <span>
            {product.name} — {product.price} €
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
