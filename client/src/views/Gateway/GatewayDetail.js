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
import gatewayApi from "../../api/gatewayApi";
import devConsole from "../../devConsole";

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

  const downloadButton = React.useRef(null);

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

  const download = async (event) => {
    event.preventDefault();

    let data;
    try {
      const res = await gatewayApi.downloadSetap({
        gatewayId: selected.data.id,
      });

      data = res?.data[0]?.setap || undefined;
    } catch (error) {
      return devConsole.log("error");
    }

    if (data === undefined) {
      return devConsole.log("error");
    }

    const output = JSON.stringify(data, null, 4);
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);

    downloadButton.current.href = fileDownloadUrl;
    downloadButton.current.click();
    URL.revokeObjectURL(fileDownloadUrl);
  };

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

                <a
                  className="hidden"
                  style={{ display: "none" }}
                  download={`apConf-${selected.data.id}.json`}
                  href={"/"}
                  ref={downloadButton}
                >
                  download it
                </a>

                <Button
                  variant="contained"
                  color="default"
                  startIcon={<GetAppIcon />}
                  onClick={download}
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
