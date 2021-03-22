/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { orange, deepOrange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import Gateways from "./components/Gateways";
import Devices from "./components/Devices";
import AllMessages from "./components/AllMessages";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

import { loadUser } from "./actions/auth";

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

function App({ loadUser, loading }) {
  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        {loading ? (
          <Loading />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={SignIn} />
              <PrivateRoute exact path="/" component={Dashboard} />
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
        )}
      </ThemeProvider>
    </React.Fragment>
  );
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
});

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
