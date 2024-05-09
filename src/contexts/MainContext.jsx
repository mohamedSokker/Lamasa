import React, { useContext, createContext, useState } from "react";

const mainContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [currentMode, setCurrentMode] = useState("Light");
  const [screenSize, setScreenSize] = useState(undefined);
  const [token, setToken] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState([]);

  const [products, setProducts] = useState([]);

  const closeSmallSidebar = () => {
    // if (screenSize <= 900) {
    setActiveMenu(false);
    // }
  };

  return (
    <mainContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        currentMode,
        setCurrentMode,
        screenSize,
        setScreenSize,
        closeSmallSidebar,
        token,
        setToken,
        usersData,
        setUsersData,
        error,
        setError,
        errorData,
        setErrorData,
        products,
        setProducts,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export const useMainContext = () => useContext(mainContext);
