import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../store/Auth/AuthProvider";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext.currentUser) {
    return <Navigate to="/vn/welcome" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
