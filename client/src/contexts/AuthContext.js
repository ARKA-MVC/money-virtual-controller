import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth: toggleAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
