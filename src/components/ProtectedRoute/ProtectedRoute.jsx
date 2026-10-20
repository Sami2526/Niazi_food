import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useContext(StoreContext);

  // Show loading indicator while auth state is being determined
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required (e.g., "admin"), check it
  if (requiredRole && role !== requiredRole) {
    // Redirect non‑admins to home (or a 403 page)
    return <Navigate to="/" replace />;
  }

  // All checks passed – render the protected page
  return children;
};

export default ProtectedRoute;