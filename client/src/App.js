import React from "react";
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
import { useAuth } from "./hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

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
