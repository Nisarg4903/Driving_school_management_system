import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Try-catch block for safely parsing user data from localStorage
let user;
try {
  user = JSON.parse(localStorage.getItem("user")) || null;
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  user = null;
}

const INITIAL_STATE = {
  currentUser: user,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
