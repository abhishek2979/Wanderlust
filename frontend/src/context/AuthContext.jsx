import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

// Create context
const AuthContext = createContext();

// Provider component that wraps the whole app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, check if user is already logged in (token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function - call API, store token + user
  const login = async (username, password) => {
    const { data } = await API.post("/users/login", { username, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setCurrentUser(data.user);
    return data;
  };

  // Register function
  const register = async (username, email, password) => {
    const { data } = await API.post("/users/register", { username, email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setCurrentUser(data.user);
    return data;
  };

  // Logout - clear storage and state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook so components can easily use auth
export const useAuth = () => useContext(AuthContext);
