import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getApplicationDetail } from "../../actions/application";
import { resetSelectedResult } from "../../actions/shared";
import Loading from "../Loading";
import NoRecourse from "../NoResource";
import ApplicationSettingsModal from "./ApplicationSettingsModal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PDRProgress from "./PDRProgress";
import Devices from "./Devices";
import MyChart from "./MyChart";

import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";

import UplinkMessages from "./UplinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import MessagesTable from "../Devices/MessagesTable";

export const ApplicationDetail = ({
  refresh,
  resetSelectedResult,
  getApplicationDetail,
  selected,
  handleSettingsClose,
  openSettings,
  classes,
  handleConfirmClose,
}) => {
  let { id } = useParams();

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
      {openSettings ? (
        <ApplicationSettingsModal
          open={openSettings}
          handleClose={handleSettingsClose}
          application={selected.data}
          handleConfirmClose={handleConfirmClose}
        />
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} style={{ height: 340 }}>
            <MyChart refresh={refresh} applicationId={selected.data.id} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <PDRProgress refresh={refresh} applicationId={selected.data.id} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Devices refresh={refresh} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MessagesTable />
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
