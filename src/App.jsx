import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
