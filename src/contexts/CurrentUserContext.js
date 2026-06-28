import { createContext } from "react";

// Holds the logged-in user and auth state for the whole app.
export const CurrentUserContext = createContext({
  currentUser: null,
  isLoggedIn: false,
});
