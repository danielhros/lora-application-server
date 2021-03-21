import React from "react";
import Layout from "./Layout";
import { logout } from "../actions/auth";

import { connect } from "react-redux";

export const Profile = ({ logout }) => {
  return (
    <Layout>
      <React.Fragment>Profile</React.Fragment>
    </Layout>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(undefined, mapDispatchToProps)(Profile);
