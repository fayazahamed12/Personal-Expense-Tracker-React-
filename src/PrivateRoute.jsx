import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
