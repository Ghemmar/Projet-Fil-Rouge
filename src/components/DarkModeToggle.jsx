import { useEffect, useState } from "react";

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
    <button onClick={() => setDark(!dark)}>{dark ? "Light" : "Dark"} </button>
  );
}

export default DarkModeToggle;
