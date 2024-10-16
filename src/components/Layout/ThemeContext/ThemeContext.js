// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangArab, setIsLangArab] = useState(false);

  const toggleLanguage = () => {
    setIsLangArab((prevMode) => !prevMode);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{isLangArab, isDarkMode, toggleTheme,toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
