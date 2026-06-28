import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// Redirects to the home page when the user is not authenticated, and opens the
// authorization popup so they can sign in (rubric requirement).
function ProtectedRoute({ isLoggedIn, onUnauthorized, children }) {
  useEffect(() => {
    if (!isLoggedIn) {
      onUnauthorized?.();
    }
  }, [isLoggedIn, onUnauthorized]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
