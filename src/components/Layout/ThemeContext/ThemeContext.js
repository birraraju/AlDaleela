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

// Load theme preference from localStorage on mount
useEffect(() => {
  const themeUpdate = localStorage.getItem("AldaleelaThemeColor");
  if (themeUpdate !== null) {
    setIsDarkMode(JSON.parse(themeUpdate)); // Convert string to boolean
  }
}, []);

  const toggleLanguage = () => {
    setIsLangArab((prevMode) => !prevMode);
    
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("AldaleelaThemeColor", JSON.stringify(newMode)); // Store as stringified boolean
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{isLangArab,setIsPOIAddShow,isPOIAddShow, isDarkMode,isLogin,isSignup,setIsLogin,setsSignup, toggleTheme,toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
