import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/Navigation/MainNavigation";
import Auth from "./components/Auth";
import NewPhoto from "./components/NewPhoto";
import UserPhotos from "./components/UserPhotos";

import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/:userId/photos" exact>
          <UserPhotos />
        </Route>
        <Route path="/photo/new" exact>
          <NewPhoto />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
