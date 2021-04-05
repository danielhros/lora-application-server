import React from "react";
import Grid from "@material-ui/core/Grid";
import { useGlobalStyles } from "../../shared/styles";
import Paper from "@material-ui/core/Paper";
import PDRProgress from "../../components/PDRProgress";
import MyChart from "../../components/MyChart";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";

export const AllMessages = ({ refresh }) => {
  const global = useGlobalStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={global.paper} style={{ height: "100%" }}>
            <MyChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={global.paper}>
            <PDRProgress value={100} />
          </Paper>
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

export default AllMessages;
