import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
