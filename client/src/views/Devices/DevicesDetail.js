import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getDeviceDetail } from "../../actions/device";
import { resetSelectedResult } from "../../actions/shared";

import NoRecourse from "../NoResource";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Loading from "../Loading";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";

export const DevicesDetail = ({
  refresh,
  resetSelectedResult,
  getDeviceDetail,
  selected,
  handleSettingsClose,
  openSettings,
  classes,
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
      <Dialog
        open={openSettings}
        onClose={handleSettingsClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Device settings</DialogTitle>

        <DialogTitle style={{ paddingTop: 0 }}>
          <Typography component="div">
            <Box
              fontSize="fontSize"
              m={1}
              style={{ marginLeft: 0, marginTop: 0 }}
            >
              {selected.name}
            </Box>
          </Typography>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="settings"
            label="Todo settings"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose} color="primary">
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={handleSettingsClose}
            color="primary"
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

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
