import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import DashBoard from "./pages/dashboard";
import Editor from "./pages/editor";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor/:file">
          <Editor />
        </Route>
        <Route path="/dashboard">
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
