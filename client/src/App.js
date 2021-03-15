import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
