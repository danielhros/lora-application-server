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
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>Device header coming soon!</p>
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
