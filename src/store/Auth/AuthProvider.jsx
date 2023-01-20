import React from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { type } from "@testing-library/user-event/dist/type";

export const AuthContext = createContext({
  currentUser: null,
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const currentPage = JSON.parse(
          window.sessionStorage.getItem("currentPage")
        );
        setCurrentUser(user);

        if (currentPage) {
          switch (currentPage) {
            case "home":
              navigate("/vn/home/" + user.uid);
              break;
            case "tvshows":
              navigate("/vn/TVShow");
              break;
            case "trending":
              navigate("/vn/trending");
              break;
            case "myList":
              navigate("/vn/myList");
              break;
            default:
              navigate("/vn/home/" + user.uid);
          }
        } else {
          navigate("/vn/home/" + user.uid);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authObj = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
