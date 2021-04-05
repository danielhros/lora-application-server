import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalStyles } from "../../shared/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import PDRProgress from "../../components/PDRProgress";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";

export const Dashboard = ({ refresh }) => {
  const classes = useStyles();
  const global = useGlobalStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={clsx(global.paper, classes.chartPaper)}>
            Map coming soon
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={clsx(global.paper)}>
                <PDRProgress value={100} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={clsx(global.paper)}>
                Top summary coming soon
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <UplinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <ScheduledDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <SentDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  chartPaper: {
    height: "100%",
  },
}));

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
