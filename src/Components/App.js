import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import SideBar from './SideBar';
import GlobalStyles from './GlobalStyles';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import Game from './Game';
import Lobby from './Lobby';
import FourOhFour from './FourOhFour';

function App() {

  return (
    <Router>
      <SideBar/>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/view-account">
          <Account />
        </Route>
        <Route exact path="/billiards">
          <Game/>
        </Route>
        <Route exact path="/view-lobby">
          <Lobby/>
        </Route>
        <Route path="/:failedPath">
          <FourOhFour/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;