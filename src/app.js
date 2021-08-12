import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import DashBoard from "./pages/dashboard";
import Editor from "./pages/editor";

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
