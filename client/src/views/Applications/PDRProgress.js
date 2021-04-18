import React from "react";
import { connect } from "react-redux";
import PDRProgressWrapper from "../../components/PDRProgressWrapper";

export const PDRProgress = (props) => {
  return <PDRProgressWrapper {...props} value={96} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PDRProgress);
