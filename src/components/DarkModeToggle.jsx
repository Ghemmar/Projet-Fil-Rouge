import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

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
      onClick={() => setDark(prev => !prev)}
      className="border px-3 py-1 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;
