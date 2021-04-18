import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "../../components/Title";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

function DCReaming() {
  const localClasses = useStyles();
  return (
    <React.Fragment>
      <Title>DC remaining</Title>
      <div className={localClasses.tableProgressBarWrapper}>
        <LinearProgress
          className={localClasses.tableProgressBar}
          variant="determinate"
          value={12}
        />{" "}
        <Typography variant="h5" component="div" color="textSecondary">
          <nobr>33980 ms</nobr>
        </Typography>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  tableProgressBarWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
  },
  tableProgressBar: {
    height: 10,
    marginRight: 20,
    width: 100,
    minWidth: 100,
  },
}));

export default DCReaming;
