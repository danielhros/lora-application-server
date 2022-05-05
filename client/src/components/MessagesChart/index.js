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
import { BASE_URL, CHART_MESSAGES } from "../../services/URLs";
import Loading from "../../views/Loading";
  

const MessagesChart = ({device_id}) => {
    const accessToken = localStorage.getItem("accessToken");
    const [data, setData] = React.useState(null);

    const [past, setPast] = React.useState('day');

    function getData(_past) {
        fetch(BASE_URL + CHART_MESSAGES + "?q="+_past + (device_id ? '&device_id='+device_id : ''), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }).then(response => {
            if(!response.ok) {
            }
            else return response.json();
        }).then(result => {
            setData(result);
        }); 
    }

    function selectChange(e) {
        setPast(e.target.value);
        getData(e.target.value);
    }

    React.useEffect(() => {    
        getData(past);
    }, []);

    if(!data) {
        return <Loading />;
    }

    let max = 0;
    data.forEach(e => {
        if(parseInt(e.uplink) > max) {max = parseInt(e.uplink);}
        if(parseInt(e.downlink) > max) {max = parseInt(e.downlink);}
    });

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis type="number" domain={[0, max]}/>
                    <Tooltip contentStyle={{color: '#000'}} />
                    <Legend />
                    <Line type="monotone" dataKey="uplink" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="downlink" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

            <select onChange={selectChange} value={past} className="drop">
                <option value="day">Last day</option>
                <option value="week">Last week</option>
                <option value="month">Last month</option>
                <option value="year">Last year</option>
            </select>
        </>
    )
}

export default MessagesChart;