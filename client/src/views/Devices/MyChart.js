import React from "react";
import { connect } from "react-redux";
import MyCharWrapper from "../../components/MyChartWrapper";

const data = [
  {
    name: "10:00",
    uplink: 40,
    collisions: 5,
    downlink: 24,
  },
  {
    name: "11:00",
    uplink: 30,
    collisions: 3,
    downlink: 13,
  },
  {
    name: "12:00",
    uplink: 58,
    collisions: 8,
    downlink: 20,
  },
  {
    name: "13:00",
    uplink: 39,
    collisions: 15,
    downlink: 2,
  },
  {
    name: "14:00",
    uplink: 48,
    collisions: 10,
    downlink: 15,
  },
];

export const MyChart = (props) => {
  return <MyCharWrapper {...props} data={data} withCollisions={true} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyChart);
