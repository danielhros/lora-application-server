import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  recourse: {
    color: theme.palette.primary.main,
  },
}));

const NoResource = ({ recourse = "" }) => {
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
          Recourse <span className={classes.recourse}>{recourse}</span> not
          found!
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default NoResource;
