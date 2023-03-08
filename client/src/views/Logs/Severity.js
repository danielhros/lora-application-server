import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";


const Severity = ({data}) => {
    const severity = [[],[],[]];
    data.forEach(item => {
        const total = parseInt(item.total);
        if(item.severity == 1)
        {
        severity[item.severity - 1].push(
            <Grid item xs={4} key={"sev-"+item.component+item.severity} className="table-block">
                <p>{item.total + " Critical " + item.component + " level"}</p>
                <LinearProgress variant="determinate" value={total > 100 ? 100 : total} style={{width:"90%"}}/>
            </Grid>
        )
        }
        else if (item.severity == 2)
        {
            severity[item.severity - 1].push(
            <Grid item xs={4} key={"sev-"+item.component+item.severity} className="table-block">
                <p>{item.total + " Very low " + item.component + " level"}</p>
                <LinearProgress variant="determinate" value={total > 100 ? 100 : total} style={{width:"90%"}}/>
            </Grid>
            )
        }
        else{
            severity[item.severity - 1].push(
            <Grid item xs={4} key={"sev-"+item.component+item.severity} className="table-block">
                <p>{item.total + " Low " + item.component + " level"}</p>
                <LinearProgress variant="determinate" value={total > 100 ? 100 : total} style={{width:"90%"}}/>
            </Grid>
            )
        }
    });

    function getOrNot(arr, index) {
        if(arr.length > index) {
            return arr[index];
        }
        return <Grid item xs={4} className="table-block"></Grid>;
    }

    const contentTable = [];

    let max = 0;
    for(let i = 0; i < severity.length; i++) {
        if(max < severity[i].length) {
            max = severity[i].length;
        }
    }

    for(let i = 0; i < max; i++) {
        contentTable.push(
            <Grid container spacing={3} key={"ct-"+i}>
                {getOrNot(severity[0], i)}
                {getOrNot(severity[1], i)}
                {getOrNot(severity[2], i)}
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className="text-center"><b>Severity lvl 1</b></div>
                </Grid>
                <Grid item xs={4}>
                    <div className="text-center"><b>Severity lvl 2</b></div>
                </Grid>
                <Grid item xs={4}>
                    <div className="text-center"><b>Severity lvl 3</b></div>
                </Grid>
            </Grid>
            {contentTable}
        </>
        
    )
}

export default Severity;