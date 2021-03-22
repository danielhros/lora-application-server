import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../components/Layout";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="login" />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(PrivateRoute);
