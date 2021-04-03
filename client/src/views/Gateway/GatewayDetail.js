import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetSelected, getGatewayDetail } from "../../actions/gateway";
import NoRecourse from "../NoResource";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const GatewayDetail = ({
  refresh,
  resetSelected,
  getGatewayDetail,
  selected,
  handleSettingsClose,
  openSettings,
}) => {
  let { id } = useParams();

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
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  }
  console.log(openSettings);

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
          {/* <DialogContentText>{selected.name}</DialogContentText> */}
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
      <div>
        <h3>{id}</h3>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ gateway }) => ({
  selected: gateway.selected,
});

const mapDispatchToProps = {
  resetSelected,
  getGatewayDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(GatewayDetail);
