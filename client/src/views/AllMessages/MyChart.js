import React from "react";
import { connect } from "react-redux";
import MyCharWrapper from "../../components/MyChartWrapper";

const data = [
  {
    name: "10:00",
    uplink: 40,
    downlink: 24,
  },
  {
    name: "11:00",
    uplink: 30,
    downlink: 13,
  },
  {
    name: "12:00",
    uplink: 20,
    downlink: 58,
  },
  {
    name: "13:00",
    uplink: 27,
    downlink: 39,
  },
  {
    name: "14:00",
    uplink: 18,
    downlink: 48,
  },
];

export const MyChart = (props) => {
  return <MyCharWrapper {...props} data={data} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyChart);
