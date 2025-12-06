import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.user);

  // If logged in → redirect to home/dashboard
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
