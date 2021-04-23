import React from "react";
import Title from "../../components/Title";
import withWidth from "@material-ui/core/withWidth";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Message type ratio",
    EMER: 22,
    NORMAL: 59,
    REG: 19,
  },
];

const CustomizedLabel = ({ x, y, width, text, height }) => {
  return (
    <text
      x={x}
      y={y + height / 2}
      dx={width / 2}
      fontSize="16"
      fontFamily="sans-serif"
      fill={"#fff"}
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {text}%
    </text>
  );
};

export const MyChartWrapper = ({ width, withCollisions }) => {
  return (
    <React.Fragment>
      <Title>Message type ratio</Title>
      <div
        style={{ height: "100%", width: "100%", minWidth: 250, minHeight: 100 }}
      >
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout={"vertical"}
          >
            <XAxis type="number" axisLine={false} hide />
            <YAxis type="category" dataKey="name" axisLine={false} hide />
            <Legend />

            <Bar
              label={<CustomizedLabel text={data[0].REG} />}
              dataKey="REG"
              stackId="a"
              fill="#8B939C"
            />
            <Bar
              label={<CustomizedLabel text={data[0].NORMAL} />}
              dataKey="NORMAL"
              stackId="a"
              fill="#72C040"
            />
            <Bar
              label={<CustomizedLabel text={data[0].EMER} />}
              dataKey="EMER"
              stackId="a"
              fill="#EC5B56"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default withWidth()(MyChartWrapper);
