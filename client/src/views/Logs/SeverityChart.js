import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
  } from "recharts";

const SeverityChart = ({data, types}) => {
    return (
        <ResponsiveContainer  width={'99%'} height={500}>
            <LineChart
            width={500}
            height={500}
            data={data}
            margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 30,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip  contentStyle={{color: '#000'}} />
            <Legend />
            {types.length === 0 || types.indexOf(1) !== -1 ? <Line type="monotone" dataKey="severity1" stroke="#8884d8" /> : null}
            {types.length === 0 || types.indexOf(2) !== -1 ? <Line type="monotone" dataKey="severity2" stroke="#82ca9d" /> : null}
            {types.length === 0 || types.indexOf(3) !== -1 ? <Line type="monotone" dataKey="severity3" stroke="#fa9d70" /> : null}
            </LineChart>
      </ResponsiveContainer>
    )
}

export default SeverityChart;