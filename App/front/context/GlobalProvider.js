import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (userInfo) => {
    setIsLogged(true);
    setUser(userInfo);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;