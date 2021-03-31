/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import { orange, deepOrange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Dashboard from "./views/Dashboard";
import Applications from "./views/Applications";
import GatewayWrapper from "./views/Gateway/GatewayWrapper";
import Devices from "./views/Devices";
import AllMessages from "./views/AllMessages";
import Profile from "./views/Profile";
import SignIn from "./views/SignIn";
import Loading from "./views/Loading";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./views/NotFound";

import { loadUser } from "./actions/auth";
import history from "./history";

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
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={SignIn} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute
                exact
                path="/applications"
                component={Applications}
              />
              <PrivateRoute path="/gateways" component={GatewayWrapper} />
              <PrivateRoute exact path="/devices" component={Devices} />
              <PrivateRoute exact path="/allMessages" component={AllMessages} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </Router>
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
