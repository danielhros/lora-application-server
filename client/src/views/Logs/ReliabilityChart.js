import React from "react";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ReliabilityChart = ({percentage}) => {

    let pathColor = "#d6d6d6";
    if(percentage >= 0 && percentage < 25) {
        pathColor = "#fa7070";
    }
    if(percentage >= 25 && percentage < 50) {
        pathColor = "#fa9d70";
    }
    if(percentage >= 50 && percentage < 75) {
        pathColor = "#fade70";
    }
    if(percentage >= 75 && percentage <= 100) {
        pathColor = "#8efa70";
    }

    return (
        <>
            <h2 className="MuiTypography-root makeStyles-title-519 MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom">
                Level of reliability
            </h2>

            <div style={{ width: '70%', margin: "auto", padding: "20px 0",}}>
                <CircularProgressbar value={percentage} strokeWidth={6} text={percentage/10}
                
                    styles={buildStyles({
                        // Text size
                        textSize: '20px',
                
                        // Colors
                        pathColor: pathColor,
                        textColor: pathColor,
                        trailColor: '#565656',
                        backgroundColor: '#3e98c7',
                    })}
                
                />
            </div>

        </>
    )
}

export default ReliabilityChart;