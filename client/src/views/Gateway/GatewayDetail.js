import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetSelected, getGatewayDetail } from "../../actions/gateway";
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
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalStyles } from "../../shared/styles";
import clsx from "clsx";
import DetailList from "./DetailList";
import Title from "../../components/Title";
import GetAppIcon from "@material-ui/icons/GetApp";
import PRDList from "./PRDList";
import Upload from "./Upload";
import MyMap from "./MyMap";
import UplinkMessages from "./UplinkMessages";
import SentDownlinkMessages from "./SentDownlinkMessages";
import ScheduledDownlinkMessages from "./ScheduledDownlinkMessages";

const GatewayDetail = ({
  refresh,
  resetSelected,
  getGatewayDetail,
  selected,
  handleSettingsClose,
  openSettings,
}) => {
  let { id } = useParams();
  const classes = useStyles();
  const global = useGlobalStyles();

  React.useEffect(() => {
    getGatewayDetail({ id });
    return () => {
      resetSelected();
    };
  }, [getGatewayDetail, id, resetSelected]);

  React.useEffect(() => {
    if (refresh) {
      getGatewayDetail({ id });
    }
  }, [getGatewayDetail, id, resetSelected, refresh]);

  if (selected === null) {
    return <Loading />;
  }

  if (selected === undefined) {
    return <NoRecourse recourse={id} />;
  }

  return (
    <React.Fragment>
      <Dialog
        open={openSettings}
        onClose={handleSettingsClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Gateway settings</DialogTitle>

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
        <Grid item xs={12} md={8}>
          <Paper className={clsx(global.paper, classes.gatewayDetail)}>
            <DetailList gateway={selected} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Paper
                className={clsx(global.paper, classes.downloadConfiguration)}
              >
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
              <Paper
                className={clsx(global.paper, classes.uploadConfiguration)}
              >
                <Title>Upload configuration</Title>
                <Upload />
              </Paper>
            </Grid>

            <Grid item xs={12} md={12}>
              <Paper className={clsx(global.paper, classes.channelsPDR)}>
                <Title>Channels PDR</Title>
                <PRDList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Map */}
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <MyMap />
          </Paper>
        </Grid>
        {/* Uplink messages */}
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <UplinkMessages refresh={refresh} />
          </Paper>
        </Grid>
        {/* Scheduled downlink messages */}
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <ScheduledDownlinkMessages />
          </Paper>
        </Grid>
        {/* Sent downlink messages */}
        <Grid item xs={12}>
          <Paper className={global.paper}>
            <SentDownlinkMessages refresh={refresh} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  gatewayDetail: {
    height: "100%",
  },
  downloadConfiguration: {
    height: "100%",
  },
  uploadConfiguration: {
    height: "100%",
  },
  channelsPDR: {
    height: "100%",
  },
}));

const mapStateToProps = ({ gateway }) => ({
  selected: gateway.selected,
});

const mapDispatchToProps = {
  resetSelected,
  getGatewayDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(GatewayDetail);
