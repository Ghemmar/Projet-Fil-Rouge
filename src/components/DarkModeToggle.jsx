import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded hover:text-yellow-400 hover:bg-gray-700 transition"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}

export default DarkModeToggle;
