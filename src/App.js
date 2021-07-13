import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Router>
      <Switch>
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
