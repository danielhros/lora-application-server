/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Title from "../../components/Title";
import chartApi from "../../api/chartApi";
import devConsole from "../../devConsole";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const initialData = [
  {
    name: "Message type ratio",
    EMER: 0,
    NORMAL: 0,
    REG: 0,
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

export const MyVerticalChart = ({ deviceId, refresh }) => {
  const [data, setData] = React.useState(initialData);
  const [tooFewData, setTooFewData] = React.useState(false);

  const getMessagesRatio = async () => {
    setTooFewData(false);
    setData(initialData);
    try {
      const res = await chartApi.getDeviceMessageRatio({
        deviceId,
      });

      const emer = res?.data?.emer || 0;
      const normal = res?.data?.normal || 0;
      const reg = res?.data?.reg || 0;

      setData([
        {
          name: "Message type ratio",
          EMER: emer,
          NORMAL: normal,
          REG: reg,
        },
      ]);

      if (emer + normal + reg === 0) {
        setTooFewData(true);
      }
    } catch (error) {
      setTooFewData(true);
      setData(initialData);
      devConsole.log(error);
    }
  };

  React.useEffect(() => {
    getMessagesRatio();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      getMessagesRatio();
    }
  }, [refresh]);

  return (
    <React.Fragment>
      <Title
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Message type ratio
        <Tooltip
          title="Ratio of message types of all messages for specific device. Message types with 0% are omitted from graph. Types can be: NORMAL, EMER and REG."
          arrow
        >
          <HelpOutlineOutlinedIcon style={{ marginLeft: 5 }} />
        </Tooltip>
      </Title>

      {tooFewData ? (
        <div style={{ minHeight: 100 }}>Too few data</div>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            minWidth: 250,
            minHeight: 100,
          }}
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

              {data[0]?.REG && (
                <Bar
                  label={<CustomizedLabel text={data[0].REG} />}
                  dataKey="REG"
                  stackId="a"
                  fill="#8B939C"
                />
              )}

              {data[0]?.NORMAL && (
                <Bar
                  label={<CustomizedLabel text={data[0].NORMAL} />}
                  dataKey="NORMAL"
                  stackId="a"
                  fill="#72C040"
                />
              )}

              {data[0]?.EMER && (
                <Bar
                  label={<CustomizedLabel text={data[0].EMER} />}
                  dataKey="EMER"
                  stackId="a"
                  fill="#EC5B56"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyVerticalChart;
