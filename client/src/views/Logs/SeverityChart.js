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

const SeverityChart = ({data}) => {
      console.log(data);
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
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="severity1" stroke="#8884d8" />
            <Line type="monotone" dataKey="severity2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="severity3" stroke="#fa9d70" />
            </LineChart>
      </ResponsiveContainer>
    )
}

export default SeverityChart;