import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import Gateways from "./components/Gateways";
import Devices from "./components/Devices";
import AllMessages from "./components/AllMessages";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

import { orange, deepOrange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
  //levelup.gitconnected.com/material-ui-how-to-implement-dark-mode-and-edit-theme-colors-effcfa0893b9
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[500],
      },
      secondary: {
        main: deepOrange[900],
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={Register} />
          <Layout>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/applications" component={Applications} />
            <Route exact path="/gateways" component={Gateways} />
            <Route exact path="/devices" component={Devices} />
            <Route exact path="/allMessages" component={AllMessages} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
