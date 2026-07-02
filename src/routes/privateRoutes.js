import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { usuario, carregando } = useAuth();

  if (carregando)
    return <p>Carregando...</p>;
  if (!usuario) 
    return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;