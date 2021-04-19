import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getDeviceDetail } from "../../actions/device";
import { resetSelectedResult } from "../../actions/shared";

import NoRecourse from "../NoResource";
import Loading from "../Loading";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import DeviceSettingsModal from "./DeviceSettingsModal";
import MyMap from "./MyMap";
import TopList from "./TopList";
import DetailList from "./DetailList";

import PDRProgress from "./PDRProgress";
import MyChart from "./MyChart";

export const DevicesDetail = ({
  refresh,
  resetSelectedResult,
  getDeviceDetail,
  selected,
  handleSettingsClose,
  openSettings,
  classes,
  handleConfirmClose,
}) => {
  let { id } = useParams();

  React.useEffect(() => {
    getDeviceDetail({ id });
    return () => {
      resetSelectedResult();
    };
  }, [getDeviceDetail, id, resetSelectedResult]);

  React.useEffect(() => {
    if (refresh) {
      getDeviceDetail({ id });
    }
  }, [id, resetSelectedResult, refresh, getDeviceDetail]);

  if (selected.data === undefined) {
    return <NoRecourse recourse={id} />;
  }

  if (selected.data === null || selected.type !== "devices") {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {openSettings ? (
        <DeviceSettingsModal
          open={openSettings}
          handleClose={handleSettingsClose}
          device={selected.data}
          handleConfirmClose={handleConfirmClose}
        />
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} style={{ height: 340 }}>
            <MyChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <PDRProgress />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={classes.paper}>
                <TopList />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Paper className={classes.paper}>
                <DetailList device={selected?.data} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <MyMap
              markers={[
                {
                  id: 1,
                  name: selected?.data?.name || "none",
                  lat: selected?.data?.lat || 49.423781,
                  lng: selected?.data?.lng || 18.696487,
                },
              ]}
            />
          </Paper>
        </Grid>

        {/* Uplink messages */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <UplinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        {/* Scheduled downlink messages */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ScheduledDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        {/* Sent downlink messages */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <SentDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = ({ result }) => ({
  selected: result.selected,
});

const mapDispatchToProps = {
  resetSelectedResult,
  getDeviceDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(DevicesDetail));
