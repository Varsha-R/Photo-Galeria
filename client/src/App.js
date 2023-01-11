import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import NewPhoto from "./components/photos/NewPhoto";
import UserPhotos from "./components/photos/UserPhotos";
import MainNavigation from "./components/shared/Navigation/MainNavigation";
import Auth from "./components/user/Auth";
import { AuthContext } from "./context/auth-context";
import LoadingSpinner from "./components/shared/UIElements/LoadingSpinner";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        {!userId && <LoadingSpinner asOverlay />}
        <Switch>
          <Route path="/photos" exact>
            <UserPhotos />
          </Route>
          <Route path="/photos/new" exact>
            <NewPhoto />
          </Route>
          <Redirect to={!userId ? "/" : "/photos"} />
        </Switch>
      </React.Fragment>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
