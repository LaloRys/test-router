import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, children, redirectTo = "/landing" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
  // return children //return children component (Home)
}

export default ProtectedRoute;
