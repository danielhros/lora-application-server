import React from "react";
import { connect } from "react-redux";
import TopListWrapper from "../../components/TopListWrapper";

export const TopList = (props) => {
  return <TopListWrapper {...props} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopList);
