import React, { useState, useEffect } from "react";
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { BASE_URL, ALL_MESSAGES } from "../../services/URLs";
import Loading from "../Loading";

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
                <td>{messages[i].datetime}</td>
                <td>{messages[i].device_id}</td>
                <td>{messages[i].snr ?? '-'}</td>
                <td>{messages[i].rssi ?? '-'}</td>
                <td>{messages[i].spf}</td>
                <td>{messages[i].power}</td>
                <td>{messages[i].gateway}</td>
                <td>{messages[i].dc_remaining}</td>
                <td>{messages[i].type === 0 ? 'uplink' : 'downlink'}</td>
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
            <div>
                <div>
                    {TYPE_CHECKBOXES}
                </div>
                <div>
                    <label htmlFor={"date-from"}>Date from</label>
                    <input type="date" name="date-from" value={query.dateFrom} id="date-from" 
                        onChange={(e)=>setQuery({...query, dateFrom: e.target.value})}  />
                </div>
                <div>
                    <label htmlFor={"date-to"}>Date to</label>
                    <input type="date" name="date-to" value={query.dateTo} id="date-to" 
                        onChange={(e)=>setQuery({...query, dateTo: e.target.value})}  />
                </div>
                <div>
                    <label htmlFor={"text"}>Device ID</label>
                    <input type="text" name="text" value={query.text} id="text" 
                        onChange={(e)=>setQuery({...query, text: e.target.value})}  />
                </div>
                <div>
                    <button role="button" onClick={filterData}>FILTER DATA</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Datetime</td>
                        <td>Device ID</td>
                        <td>SNR</td>
                        <td>RSSI</td>
                        <td>SPF</td>
                        <td>Power</td>
                        <td>Gateway</td>
                        <td>DC remaining</td>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
            <Pagination count={data.pagination.pages} page={query.page} onChange={handlePageClick} />
        </>
    )
}

export default MessagesTable;