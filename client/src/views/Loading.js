import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const Loading = () => {
  const useStyles = makeStyles(() => ({
    root: {
      height: "60vh",
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography component="h2" variant="h6" gutterBottom align={"center"}>
          LoRa@FIIT Application Server
        </Typography>
        <CircularProgress />
      </Grid>
    </React.Fragment>
  );
};

export default Loading;
