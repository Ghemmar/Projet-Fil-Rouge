import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isAuth", "true");

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
        Connexion
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-2 py-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        Accès réservé à l’administration
      </p>
    </div>
  );
}

export default Login;
