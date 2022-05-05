import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import newStyles from "../../shared/newStyles";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const TABLE_HEAD = [
    {key: "severity", value: "Severity"}, {key: "component", value: "Component"},
    {key: "date", value: "Date"}, {key: "device_id", value: "Device ID"},
    {key: "description", value: "Description"},
];

const SeverityTable = ({data, page, handlePageClick}) => {

    const {rows} = data;
    const result = [];
    for(let i = 0; i < rows.length; i++) {
        result.push(
            <tr key={'logs-tbody-key-'+i}>
                <td style={newStyles.tableCell}>{rows[i].severity}</td>
                <td style={newStyles.tableCell}>{rows[i].component}</td>
                <td style={newStyles.tableCell}>{rows[i].date}</td>
                <td style={newStyles.tableCell}>{rows[i].device_id}</td>
                <td style={newStyles.tableCell}>{rows[i].description}</td>
            </tr>
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
            <h2 className="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary">Logs</h2>
            
            <table style={newStyles.tableStyle} className="table">
                <thead>
                    <tr>
                        {THEAD}
                        <td className="orderable-td"></td>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>

            <Pagination count={data.pagination.pages} page={page} onChange={handlePageClick} style={{marginTop: 10}}/>
        </>
    )
}

export default SeverityTable;