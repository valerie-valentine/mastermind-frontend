import { createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext(null);
const kBaseUrl = `${process.env.REACT_APP_BACKEND_URL}`;

export const UserProvider = ({ children }) => {
  const getCookie = (name) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  };

  const [authUser, setAuthUser] = useState(getCookie("authenticatedUser"));
  const [credentials, setCredentials] = useState(getCookie("credentials"));

  const signIn = async (credentials) => {
    return axios
      .post(`${kBaseUrl}/clients/authentication`, credentials)
      .then((res) => {
        if (res.status === 200) {
          setAuthUser(res.data.client);
          setCredentials(credentials);
          Cookies.set("authenticatedUser", JSON.stringify(res.data.client), {
            expires: 1,
          });
          Cookies.set("credentials", JSON.stringify(credentials), {
            expires: 1,
          });
          return res.data.client;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    setAuthUser(null);
    setCredentials(null);
    Cookies.remove("authenticatedUser");
    Cookies.remove("credentials");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        credentials,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
