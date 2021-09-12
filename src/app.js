import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";

import Home from "./pages/home";
import DashBoard from "./pages/dashboard";
import Editor from "./pages/editor";

import Profile from "./pages/profile";
import Preference from "./pages/preference";
import Plans from "./pages/plans";

import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor/:webtoonIndex/:cutIndex">
          <Editor />
        </Route>
        <Route path={["/dashboard/:webtoonIndex", "/dashboard"]}>
          <DashBoard />
        </Route>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/preference">
          <Preference />
        </Route>
        <Route path="/plans">
          <Plans />
        </Route>

        <Route exact path={["/", "/login"]}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
