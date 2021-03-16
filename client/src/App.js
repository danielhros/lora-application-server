import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import Gateways from "./components/Gateways";
import Devices from "./components/Devices";
import AllMessages from "./components/AllMessages";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/applications" component={Applications} />
          <Route exact path="/gateways" component={Gateways} />
          <Route exact path="/devices" component={Devices} />
          <Route exact path="/allMessages" component={AllMessages} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
