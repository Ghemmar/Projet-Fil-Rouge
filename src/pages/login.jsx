import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isAuth", "true");
      navigate("/admin");
    }
  };

  return (
    <div className="p-6  bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
