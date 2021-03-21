/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import Gateways from "./components/Gateways";
import Devices from "./components/Devices";
import AllMessages from "./components/AllMessages";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { connect } from "react-redux";

import { setBaseUrl } from "../src/utils/setAuthToken";

import { orange, deepOrange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { loadUser } from "./actions/auth";

setBaseUrl(process.env.REACT_APP_BASE_URL);

function App({ loadUser, loading }) {
  React.useEffect(() => {
    loadUser();
  }, []);

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
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/login" component={SignIn} />
              <PrivateRoute
                exact
                path="/applications"
                component={Applications}
              />
              <PrivateRoute exact path="/gateways" component={Gateways} />
              <PrivateRoute exact path="/devices" component={Devices} />
              <PrivateRoute exact path="/allMessages" component={AllMessages} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </>
  );
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
});

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
