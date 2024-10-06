
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isPrivate }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(!isPrivate && isAuthenticated){
    return <Navigate to="/home" />;
  }
  return children;
}

export default PrivateRoute;
