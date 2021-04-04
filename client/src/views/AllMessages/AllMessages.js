import React from "react";
import Grid from "@material-ui/core/Grid";
import globalStyles from "../../shared/styles";
import Paper from "@material-ui/core/Paper";
import PDRProgress from "../../components/PDRProgress";
import MyChart from "../../components/MyChart";
import UplinkTable from "./UplinkTable";
import ScheduledDownlinkTable from "./ScheduledDownlinkTable";
import SentDownlinkTable from "./SentDownlinkTable";

export const AllMessages = ({ refresh }) => {
  const global = globalStyles();

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
            <UplinkTable refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <ScheduledDownlinkTable refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <SentDownlinkTable refresh={refresh} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AllMessages;
