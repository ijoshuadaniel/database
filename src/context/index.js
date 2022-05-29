import { createContext, useState } from 'react';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [login, setLogin] = useState(null);

  const contextValue = {
    login,
    setLogin,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
