import React from "react";
import UserContext from "./create";


export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    picture: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);    

  const userContextValue = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
