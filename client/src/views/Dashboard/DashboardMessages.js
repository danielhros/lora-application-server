import React, { useState, useEffect } from "react";
import { BASE_URL, MESSAGE_DASHBOARD } from "../../services/URLs";
import Loading from "../Loading";
import newStyles from "../../shared/newStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import MessageDetail from "../../components/MessageDetail";

const TABLE_HEAD = [
    {key: "datetime", value: "Datetime"}, {key: "device_id", value: "Device ID"}, {key: "snr", value: "SNR"},
    {key: "rssi", value: "RSSI"}, {key: "spf", value: "SPF"}, {key: "power", value: "Power"},
    {key: "gateway", value: "Gateway"}, {key: "dc_remaining", value: "DC remaining"}, {key: "type", value: "Type"},
];

const DashboardMessages = () => {
    const accessToken = localStorage.getItem("accessToken");

    const [data, setData] = useState(null);

    function getData(url) {
        fetch(url, {
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

    useEffect(() => {
        getData(BASE_URL + MESSAGE_DASHBOARD);
    }, []);

    if(!data) {return <Loading />;}

    const messages = data;
    const result = [];
    for(let i = 0; i < messages.length; i++) {
        result.push(
            <MessageDetail id={messages[i].id} type={messages[i].type} key={'messages-tbody-key-'+i}>
                <td style={newStyles.tableCell}>{new Date(messages[i].datetime).toLocaleString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit',
                    minute: '2-digit'})}</td>
                <td style={newStyles.tableCell}>{messages[i].device_id}</td>
                <td style={newStyles.tableCell}>{messages[i].snr ?? '-'}</td>
                <td style={newStyles.tableCell}>{messages[i].rssi ?? '-'}</td>
                <td style={newStyles.tableCell}>{messages[i].spf}</td>
                <td style={newStyles.tableCell}>{messages[i].power}</td>
                <td style={newStyles.tableCell}>{messages[i].gateway}</td>
                <td style={newStyles.tableCell}>
                    {messages[i].dc_remaining} ms 
                    <LinearProgress variant="determinate" value={messages[i].dc_remaining%111} style={{width:"75%"}}/>
                </td>
                <td style={newStyles.tableCell}>{messages[i].type === 0 ? 'uplink' : 'downlink'}</td>
            </MessageDetail>
        )
    }

    const THEAD = [];
    for(let i = 0; i< TABLE_HEAD.length; i++) {
        THEAD.push(
            <td key={"thead - " + i}>
                {TABLE_HEAD[i].value}
            </td>
        );
    }

    return (
        <>
            <h2 className="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary">Latest messages</h2>
            <table style={newStyles.tableStyle} className="table">
                <thead>
                    <tr>
                        {THEAD}
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
        </>
    )
}

export default DashboardMessages;