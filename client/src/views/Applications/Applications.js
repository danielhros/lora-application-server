import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";

export const Applications = ({ classes }) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={clsx(classes.paper)}>
            Table of applications coming soon
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({}));

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(Applications));
