import React from "react";
import { connect } from "react-redux";
import PDRProgressWrapper from "../../components/PDRProgressWrapper";

export const PDRProgress = (props) => {
  return <PDRProgressWrapper {...props} />;
};

const mapStateToProps = ({ result }) => ({
  value: result?.selected?.data?.pdr || 0,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PDRProgress);
