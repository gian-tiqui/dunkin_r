import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("dunkin") !== null;

  return !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    element
  );
};

export default ProtectedRoute;
