import { Navigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

const ProctedRoute = ({ children }) => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProctedRoute;
