import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { globalStyles } from "../../shared/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import PDRProgress from "../../components/PDRProgress";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import { withStyles } from "@material-ui/core/styles";
import Title from "../../components/Title";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import TopList from "./TopList";

export const Dashboard = ({ refresh, classes }) => {
  const localClasses = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={clsx(classes.paper, localClasses.chartPaper)}>
            Map coming soon
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={clsx(classes.paper)}>
                <PDRProgress value={100} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={clsx(classes.paper)}>
                <Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Top{" "}
                  <Tooltip title="Most used values" arrow>
                    <HelpOutlineOutlinedIcon style={{ marginLeft: 5 }} />
                  </Tooltip>
                </Title>
                <TopList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <UplinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ScheduledDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(Dashboard));
