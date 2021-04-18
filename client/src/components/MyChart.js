import React from "react";
import { connect } from "react-redux";
import Title from "./Title";
import { useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

export const MyChart = ({ width }) => {
  const theme = useTheme();
  let graphData = data;

  if (isWidthDown("sm", width)) {
    graphData = data.slice(2);
  } else if (isWidthDown("md", width)) {
    graphData = data.slice(1);
  }

  return (
    <React.Fragment>
      <div style={{ height: 260, minWidth: 400 }}>
        <Title subtitle={"uplink & downlink"}>
          All messages count per hour
        </Title>
        <ResponsiveContainer>
          <BarChart
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <Legend
              align={isWidthUp("sm", width) ? "right" : "center"}
              layout={isWidthUp("sm", width) ? "vertical" : "horizontal"}
              verticalAlign={isWidthUp("sm", width) ? "middle" : "bottom"}
              wrapperStyle={isWidthUp("sm", width) ? { right: 0 } : {}}
            />
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <Tooltip contentStyle={{ color: "black" }} />
            <Bar
              dataKey="uplink"
              fill="#8783D1"
              label={{ position: "insideBottom", fill: "#fff" }}
            />
            <Bar
              dataKey="downlink"
              fill="#8B939C"
              label={{ position: "insideBottom", fill: "#fff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default withWidth()(MyChart);
