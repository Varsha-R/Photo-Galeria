import React, { useState, useCallback } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        {!userId && <LoadingSpinner asOverlay />}
        <Switch>
          <Route path="/:userId/photos" exact>
            <UserPhotos />
          </Route>
          <Route path="/photos/new" exact>
            <NewPhoto />
          </Route>
          <Redirect to={!userId ? "/" : `/${userId}/photos`} />
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
        isLoggedIn: isLoggedIn,
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
