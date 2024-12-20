// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangArab, setIsLangArab] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup forms
  const [isSignup, setsSignup] = useState(false); // State to toggle between login and signup forms
  const [isPOIAddShow,setIsPOIAddShow]=useState(false);
  const [showToast, setShowToast] = useState(false)
  const[toastMessage, setToastMessage] = useState("")
  const [isGeneralInfo,setIsGeneralInfo] = useState(false)
  const [isStackInfo,setIsStockInfo] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [mediaType, setMediaType] = useState(""); // "image" or "video"
  const [mediaSource, setMediaSource] = useState("");
  

// Load theme preference from localStorage on mount
useEffect(() => {
  const themeUpdate = localStorage.getItem("AldaleelaThemeColor");
  if (themeUpdate !== null) {
    setIsDarkMode(JSON.parse(themeUpdate)); // Convert string to boolean
  }
}, []);

useEffect(() => {
  const themeUpdate = localStorage.getItem("AldaleelaLangaugeTheme");
  if (themeUpdate !== null) {
    setIsLangArab(JSON.parse(themeUpdate)); // Convert string to boolean
  }
}, []);

useEffect(()=>{
  const body = document.body;
  if(isLangArab){
    body.classList.add('body_cairo');
    body.classList.remove('body_omnes');
  }else{
    body.classList.add('body_omnes');
    body.classList.remove('body_cairo');
  }
},[isLangArab])

useEffect(()=>{

  const bodyElement = document.querySelector('body');

if (isDarkMode) {
    bodyElement.classList.add('dark-mode');
} else {
    bodyElement.classList.remove('dark-mode');
}
},[isDarkMode])



  const toggleLanguage = () => {
    setIsLangArab((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("AldaleelaLangaugeTheme", JSON.stringify(newMode)); // Store as stringified boolean
      return newMode;
    });
    
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("AldaleelaThemeColor", JSON.stringify(newMode)); // Store as stringified boolean
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{isLangArab,isPlayerOpen, setIsPlayerOpen,mediaType, setMediaType,mediaSource, setMediaSource,setIsPOIAddShow,isGeneralInfo,setIsGeneralInfo,isStackInfo,setIsStockInfo,showToast, setShowToast,toastMessage, setToastMessage,isPOIAddShow, isDarkMode,isLogin,isSignup,setIsLogin,setsSignup, toggleTheme,toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
