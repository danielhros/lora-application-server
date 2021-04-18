import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "../../components/Title";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

function DCRefresh() {
  const localClasses = useStyles();
  return (
    <React.Fragment>
      <Title>DC refresh in</Title>
      <div className={localClasses.tableProgressBarWrapper}>
        <LinearProgress
          className={localClasses.tableProgressBar}
          variant="determinate"
          value={12}
        />
        <Typography variant="h5" component="div" color="textSecondary">
          <nobr>33 min</nobr>
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
    minWidth: 100,
  },
}));

export default DCRefresh;
