import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
