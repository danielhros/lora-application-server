import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../components/Layout";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Layout setRefresh={() => setRefresh(true)}>
            <Component
              {...props}
              refresh={refresh}
              callRefresh={() => setRefresh(true)}
            />
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
