import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getGatewayDetail } from "../../actions/gateway";
import { resetSelectedResult } from "../../actions/shared";
import NoRecourse from "../NoResource";
import Button from "@material-ui/core/Button";
import Loading from "../Loading";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import DetailList from "./DetailList";
import Title from "../../components/Title";
import GetAppIcon from "@material-ui/icons/GetApp";
import PRDList from "./PRDList";
import Upload from "./Upload";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";
import GatewaySettingsModal from "./GatewaySettingsModal";
import MyMap from "./MyMap";

const GatewayDetail = ({
  refresh,
  resetSelectedResult,
  getGatewayDetail,
  selected,
  handleSettingsClose,
  openSettings,
  classes,
  handleConfirmClose,
}) => {
  let { id } = useParams();

  React.useEffect(() => {
    getGatewayDetail({ id });
    return () => {
      resetSelectedResult();
    };
  }, [getGatewayDetail, id, resetSelectedResult]);

  React.useEffect(() => {
    if (refresh) {
      getGatewayDetail({ id });
    }
  }, [getGatewayDetail, id, resetSelectedResult, refresh]);

  if (selected.data === undefined) {
    return <NoRecourse recourse={id} />;
  }

  if (selected.data === null || selected.type !== "gateways") {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {openSettings ? (
        <GatewaySettingsModal
          open={openSettings}
          handleClose={handleSettingsClose}
          gateway={selected.data}
          handleConfirmClose={handleConfirmClose}
        />
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={clsx(classes.paper)}>
            <DetailList gateway={selected.data} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Paper className={clsx(classes.paper)}>
                <Title>Download configuration</Title>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<GetAppIcon />}
                >
                  Download
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12}>
              <Paper className={clsx(classes.paper)}>
                <Title>Upload configuration</Title>
                <Upload />
              </Paper>
            </Grid>

            <Grid item xs={12} md={12}>
              <Paper className={clsx(classes.paper)}>
                <Title>Channels PDR</Title>
                <PRDList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Map */}
        <Grid item xs={12}>
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
  getGatewayDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(GatewayDetail));
