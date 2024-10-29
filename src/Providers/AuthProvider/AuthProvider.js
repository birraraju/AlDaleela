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
  const [isMeasurement,setIsMeaseurement]=useState(false);
  const [dropPinObjectId , setDropPinObjectId] = useState(null);
  
  return (
    <AuthContext.Provider value={{isMeasurement,setIsMeaseurement, role, setRole,isAuthPopUp, setIsAuthPopUp,profiledetails ,setIsEditPOI,isEditPOI, setprofiledetails , 
    contextMapView, setconrextMapView, initialExtent, setinitialExtent, popupselectedgeo, setPopupSelectedGeo, dropPinObjectId , setDropPinObjectId}}>
      {children}
    </AuthContext.Provider>
  );
};
