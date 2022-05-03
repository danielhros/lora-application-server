import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";


const Severity = ({data}) => {
    const severity = [[],[],[]];
    data.forEach(item => {
        const total = parseInt(item.total);
        severity[item.severity - 1].push(
            <td key={"sev-"+item.component+item.severity}>
                <p>{item.total + " Critical " + item.component + " value (< 60)"}</p>
                <LinearProgress variant="determinate" value={total > 100 ? 100 : total} style={{width:"90%"}}/>
            </td>
        )
    });

    const contentTable = [];
    for(let i = 0; i < severity[0].length; i++) {
        contentTable.push(
            <tr key={"ct-"+i}>
                {severity[0][i]}
                {severity[1][i]}
                {severity[2][i]}
            </tr>
        )
    }

    return (
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th>Severity lvl 1</th>
                    <th>Severity lvl 2</th>
                    <th>Severity lvl 3</th>
                </tr>
            </thead>
            <tbody>
                {contentTable}
            </tbody>
        </table>
    )
}

export default Severity;