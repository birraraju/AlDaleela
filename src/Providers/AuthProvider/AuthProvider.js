import { createContext, useContext, useState } from "react";

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
  const [profiledetails , setprofiledetails] = useState(null);

  return (
    <AuthContext.Provider value={{ role, setRole, profiledetails , setprofiledetails }}>
      {children}
    </AuthContext.Provider>
  );
};
