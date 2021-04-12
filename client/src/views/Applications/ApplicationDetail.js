import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getApplicationDetail } from "../../actions/application";
import { resetSelectedResult } from "../../actions/shared";
import Loading from "../Loading";
import NoRecourse from "../NoResource";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PDRProgress from "../../components/PDRProgress";
import { useHistory, useLocation } from "react-router-dom";

import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";

import UplinkMessages from "./UplinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";

export const ApplicationDetail = ({
  refresh,
  resetSelectedResult,
  getApplicationDetail,
  selected,
  handleSettingsClose,
  openSettings,
  classes,
}) => {
  let { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    getApplicationDetail({ id });
    return () => {
      resetSelectedResult();
    };
  }, [getApplicationDetail, id, resetSelectedResult]);

  React.useEffect(() => {
    if (refresh) {
      getApplicationDetail({ id });
    }
  }, [id, resetSelectedResult, refresh, getApplicationDetail]);

  if (selected.data === undefined) {
    return <NoRecourse recourse={id} />;
  }

  if (selected.data === null || selected.type !== "application") {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Dialog
        open={openSettings}
        onClose={handleSettingsClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Application settings</DialogTitle>

        <DialogTitle style={{ paddingTop: 0 }}>
          <Typography component="div">
            <Box
              fontSize="fontSize"
              m={1}
              style={{ marginLeft: 0, marginTop: 0 }}
            >
              {selected.data.name}
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
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} style={{ height: "100%" }}>
            Chart coming soon!
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <PDRProgress value={100} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/gateways/71");
              }}
              color="primary"
            >
              pojde to
            </Button>
          </Paper>
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

const mapStateToProps = ({ result }) => ({
  selected: result.selected,
});

const mapDispatchToProps = {
  resetSelectedResult,
  getApplicationDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(ApplicationDetail));
