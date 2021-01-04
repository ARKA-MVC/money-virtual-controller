import React, { useEffect, useState } from "react";
import { IsUserLogin } from "../utils/Auth";

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const getCurrentUser = () => {
    IsUserLogin.then((res) => {
      setUser(res.data.results);
    });
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
