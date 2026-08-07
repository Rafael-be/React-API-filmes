import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { usuario, carregando } = useAuth();
  const location = useLocation();

  if (carregando)
    return <p>Carregando...</p>;
  if (!usuario)
    return <Navigate to={`${location.pathname}?auth=login`} replace />;

  return children;
};

export default PrivateRoute;