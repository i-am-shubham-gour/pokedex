import { createContext, useContext, useMemo, useState } from "react";

const authContext = createContext();

export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
  const userDetails = JSON.parse(sessionStorage.getItem("user")) || {};
  const [user, setUser] = useState(userDetails);

  const submitUser = (value) => {
    sessionStorage.setItem("user", JSON.stringify(value));
    setUser(value);
  };

  const context = useMemo(() => ({ user, setUser, submitUser }), [user]);

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
};
