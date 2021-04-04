import React from "react";
import { connect } from "react-redux";
import Title from "./Title";

export const MyChart = (props) => {
  return (
    <div>
      <Title subtitle={"uplink & downlink"}>All messages count per hour</Title>
      Todo chart
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyChart);
