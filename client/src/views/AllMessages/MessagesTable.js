import React, { useState, useEffect } from "react";
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { BASE_URL, ALL_MESSAGES } from "../../services/URLs";
import Loading from "../Loading";
import newStyles from "../../shared/newStyles";

const MESSAGE_TYPES = [
    {id: 'uplink', value: 'Uplink messages'}, 
    {id: 'scheduled', value: 'Scheduled downlink messages'},
    {id: 'downlink', value: 'Sent downlink messages'},
];


const MessagesTable = () => {
    const accessToken = localStorage.getItem("accessToken");

    const [data, setData] = useState(null);
    const [query, setQuery] = useState({
        types: ['uplink', 'scheduled', 'downlink'],
        dateFrom: '',
        dateTo: '',
        text: '',
        orderBy: null,
        page: 1,
    });

    function filterData() {
        setData(null);
        setQuery({...query, page: 1});
        const URL = BASE_URL + ALL_MESSAGES + '?' + queryString.stringify(query);
        getData(URL);
    }

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

    const handlePageClick = (e, value) => {
        const _query = {...query, page: value};
        const URL = BASE_URL + ALL_MESSAGES + '?' + queryString.stringify(_query);
        getData(URL);
        setQuery(_query);
    }

    useEffect(() => {
        getData(BASE_URL + ALL_MESSAGES);
    }, []);

    if(!data) {return <Loading />;}

    const messages = data.rows;
    const result = [];
    for(let i = 0; i < messages.length; i++) {
        result.push(
            <tr key={'messages-tbody-key-'+i}>
                <td style={newStyles.tableCell}>{new Date(messages[i].datetime).toLocaleString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit',
                    minute: '2-digit'})}</td>
                <td style={newStyles.tableCell}>{messages[i].device_id}</td>
                <td style={newStyles.tableCell}>{messages[i].snr ?? '-'}</td>
                <td style={newStyles.tableCell}>{messages[i].rssi ?? '-'}</td>
                <td style={newStyles.tableCell}>{messages[i].spf}</td>
                <td style={newStyles.tableCell}>{messages[i].power}</td>
                <td style={newStyles.tableCell}>{messages[i].gateway}</td>
                <td style={newStyles.tableCell}>{messages[i].dc_remaining}</td>
                <td style={newStyles.tableCell}>{messages[i].type === 0 ? 'uplink' : 'downlink'}</td>
            </tr>
        )
    }

    function handleCheckbox(_id) {
        const _types = [...query.types];
        let index = _types.indexOf(_id);
        if (index !== -1) {
            _types.splice(index, 1);
        }
        else {
            _types.push(_id);
        }
        setQuery({
            ...query,
            types: _types,
        });
    }

    const TYPE_CHECKBOXES = [];
    for(let i = 0; i < MESSAGE_TYPES.length; i++) {
        TYPE_CHECKBOXES.push(
            <div key={"checkbox-messages-"+i}>
                <input type="checkbox" id={MESSAGE_TYPES[i].id} onChange={()=>handleCheckbox(MESSAGE_TYPES[i].id)} name="types[]" checked={query.types.includes(MESSAGE_TYPES[i].id)} />
                <label htmlFor={MESSAGE_TYPES[i].id}>{MESSAGE_TYPES[i].value}</label>
            </div>
        )
    }

    return (
        <>
            <div style={{display: 'flex'}}>
                <div>
                    {TYPE_CHECKBOXES}
                </div>
                <div style={newStyles.dateInput}>
                    <label htmlFor={"date-from"}>Date from</label>
                    <input type="date" name="date-from" style={newStyles.textInput} value={query.dateFrom} id="date-from" 
                        onChange={(e)=>setQuery({...query, dateFrom: e.target.value})}  />
                </div>
                <div style={newStyles.dateInput}>
                    <label htmlFor={"date-to"}>Date to</label>
                    <input type="date" name="date-to" style={newStyles.textInput} value={query.dateTo} id="date-to" 
                        onChange={(e)=>setQuery({...query, dateTo: e.target.value})}  />
                </div>
                <div style={newStyles.dateInput}>
                    <label htmlFor={"text"}>Device ID</label>
                    <input type="text" name="text" style={newStyles.textInput} value={query.text} id="text" 
                        onChange={(e)=>setQuery({...query, text: e.target.value})}  />
                </div>
                <div style={newStyles.dateInput}>
                    <button role="button" onClick={filterData} style={newStyles.filterButton}>FILTER DATA</button>
                </div>
            </div>
            <table style={newStyles.tableStyle}>
                <thead>
                    <tr>
                        <td style={newStyles.tableCell}>Datetime</td>
                        <td style={newStyles.tableCell}>Device ID</td>
                        <td style={newStyles.tableCell}>SNR</td>
                        <td style={newStyles.tableCell}>RSSI</td>
                        <td style={newStyles.tableCell}>SPF</td>
                        <td style={newStyles.tableCell}>Power</td>
                        <td style={newStyles.tableCell}>Gateway</td>
                        <td style={newStyles.tableCell}>DC remaining</td>
                        <td style={newStyles.tableCell}>Type</td>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
            <Pagination count={data.pagination.pages} page={query.page} onChange={handlePageClick} style={{marginTop: 10}}/>
        </>
    )
}

export default MessagesTable;