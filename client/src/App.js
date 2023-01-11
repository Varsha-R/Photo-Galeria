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

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/:userId/photos" exact>
            <UserPhotos />
          </Route>
          <Route path="/photos/new" exact>
            <NewPhoto />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
