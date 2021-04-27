import React from "react";
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

export const MyChartWrapper = ({
  width,
  data = [],
  withCollisions,
  subtitle = "uplink & downlink",
}) => {
  const theme = useTheme();
  let graphData = data;

  if (isWidthDown("sm", width)) {
    graphData = data.slice(2);
  } else if (isWidthDown("md", width)) {
    graphData = data.slice(1);
  }

  return (
    <React.Fragment>
      <div style={{ height: 250, minWidth: 400 }}>
        <Title subtitle={subtitle}>Latest messages count per hour</Title>
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
            {withCollisions && (
              <Bar
                dataKey="collisions"
                fill="#EC5B56"
                label={{ position: "insideBottom", fill: "#fff" }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default withWidth()(MyChartWrapper);
