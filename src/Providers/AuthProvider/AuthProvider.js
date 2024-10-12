import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  
   // Set role from localStorage when the component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem("AldaleelaRole");
    if (storedRole) {
      setRole(storedRole); // Set role from localStorage if available
    }else{
      setRole(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
