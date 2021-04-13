import React from "react";
import { connect } from "react-redux";

import { getDevices, getCountOfDevices } from "../../actions/application";
import {
  setRowsPerPage,
  cleanResults as cleanDevices,
} from "../../actions/shared";

import DevicesWrapper from "../../components/DevicesWrapper";

export const UplinkMessages = (props) => {
  return <DevicesWrapper {...props} />;
};

const mapStateToProps = ({ result }) => ({
  devices: result.results,
  countOfDevices: result.countOfResults,
  rowsPerPage: result.rowsPerPage,
});

const mapDispatchToProps = {
  getDevices,
  getCountOfDevices,
  setRowsPerPage,
  cleanDevices,
};

export default connect(mapStateToProps, mapDispatchToProps)(UplinkMessages);
