import React, {useEffect, useState} from "react";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import queryString from 'query-string';
import newStyles from "../../shared/newStyles";
import ReliabilityChart from "./ReliabilityChart";
import SeverityChart from "./SeverityChart";
import SeverityTable from "./SeverityTable";
import Severity from "./Severity";
import { BASE_URL, LOGS } from "../../services/URLs";
import Loading from "../Loading";

const SEVERITY_TYPES = [
    {id: 1, value: 'Severity 1'}, 
    {id: 2, value: 'Severity 2'},
    {id: 3, value: 'Severity 3'},
];

const Logs = ({ classes }) => {
    const accessToken = localStorage.getItem("accessToken");

    const [data, setData] = useState(null);
    const [query, setQuery] = useState({
        types: [1, 2, 3],
        dateFrom: '2021-02-02',
        dateTo: '2021-08-02',
        text: '',
        page: 1,
    });

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

    function filterData() {
        setData(null);
        setQuery({...query, page: 1});
        const URL = BASE_URL + LOGS + '?' + queryString.stringify(query);
        getData(URL);
    }

    
    const handlePageClick = (e, value) => {
        const _query = {...query, page: value};
        const URL = BASE_URL + LOGS + '?' + queryString.stringify(_query);
        getData(URL);
        setQuery(_query);
    }

    useEffect(() => {
        getData(BASE_URL + LOGS + '?' + queryString.stringify(query));
    }, []);

    if(!data) {return <Loading />}

    const TYPE_CHECKBOXES = [];
    for(let i = 0; i < SEVERITY_TYPES.length; i++) {
        TYPE_CHECKBOXES.push(
            <div key={"checkbox-severity-"+i}>
                <input className="custom-checkbox" type="checkbox" id={SEVERITY_TYPES[i].id} onChange={()=>handleCheckbox(SEVERITY_TYPES[i].id)} name="types[]" checked={query.types.includes(SEVERITY_TYPES[i].id)} />
                <label htmlFor={SEVERITY_TYPES[i].id}>{SEVERITY_TYPES[i].value}</label>
            </div>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Paper className={clsx(classes.paper)}>
                    
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
                            <button role="button" className="btn" onClick={filterData} style={newStyles.filterButton}>FILTER DATA</button>
                        </div>
                    </div>

                </Paper>
            </Grid>

            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} md={3}>
                        <Paper className={clsx(classes.paper)}>
                            <ReliabilityChart percentage={(10 - data.reliability)*10} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <Paper className={clsx(classes.paper)}>
                            <Severity data={data.severity} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
                <Paper className={clsx(classes.paper)}>
                    <SeverityChart data={data.chart} types={query.types} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
                <Paper className={clsx(classes.paper)}>
                    <SeverityTable data={data.table} page={query.page} handlePageClick={handlePageClick} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(globalStyles)(Logs);
