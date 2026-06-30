import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";

// Guards a route. While the stored token is still being validated
// (isCheckingAuth) it shows a preloader instead of redirecting, so a logged-in
// user who reloads a protected URL is not bounced to the home page. Once the
// check is done, unauthenticated users are redirected to "/" and the login
// popup is opened.
function ProtectedRoute({ isLoggedIn, isCheckingAuth, onUnauthorized, children }) {
  useEffect(() => {
    if (!isCheckingAuth && !isLoggedIn) {
      onUnauthorized?.();
    }
  }, [isCheckingAuth, isLoggedIn, onUnauthorized]);

  if (isCheckingAuth) {
    return <Preloader text="Comprobando tu sesión..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
