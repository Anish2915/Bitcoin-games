import React, { createContext, useState, useContext } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, default is light
  const [theme, setTheme] = useState('light');

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
