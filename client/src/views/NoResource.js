import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
}));

const NoResource = ({ recourse = "provided" }) => {
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
          {/* <Box color="primary.main">404</Box> */}
          Recourse {recourse} not found!
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default NoResource;
