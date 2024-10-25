import { createContext, useContext, useEffect, useState } from "react";

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
  const [contextMapView , setconrextMapView] = useState(null);
  const [initialExtent , setinitialExtent] = useState(null);
  const [isEditPOI,setIsEditPOI]=useState(false);
  const [isAuthPopUp,setIsAuthPopUp]=useState(false);
  const [popupselectedgeo, setPopupSelectedGeo] = useState();
  
  return (
    <AuthContext.Provider value={{ role, setRole,isAuthPopUp, setIsAuthPopUp,profiledetails ,setIsEditPOI,isEditPOI, setprofiledetails , 
    contextMapView, setconrextMapView, initialExtent, setinitialExtent, popupselectedgeo, setPopupSelectedGeo}}>
      {children}
    </AuthContext.Provider>
  );
};
