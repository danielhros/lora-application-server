import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../../components/Title";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MessageForm from "./MessageForm";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const GatewaySettingsModal = ({
  open,
  handleClose,
  handleConfirmClose,
  gateway = null,
}) => {
  const localClasses = useStyles();

  const [codingRateNORMAL, setCodingRateNORMAL] = React.useState("4/5");
  const [transmissionPowerNORMAL, setTransmissionPowerNORMAL] = React.useState(
    5
  );
  const [spreadingFactorNORMAL, setSpreadingFactorNORMAL] = React.useState(7);

  const [codingRateREG, setCodingRateREG] = React.useState("4/5");
  const [transmissionPowerREG, setTransmissionPowerREG] = React.useState(5);
  const [spreadingFactorREG, setSpreadingFactorREG] = React.useState(7);

  const [codingRateEMER, setCodingRateEMER] = React.useState("4/5");
  const [transmissionPowerEMER, setTransmissionPowerEMER] = React.useState(5);
  const [spreadingFactorEMER, setSpreadingFactorEMER] = React.useState(7);

  const [bandNORMAL, setBandNORMAL] = React.useState(125);
  const [bandREG, setBandREG] = React.useState(125);
  const [bandEMER, setBandEMER] = React.useState(125);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (gateway === null) {
    return null;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <MuiDialogTitle
          disableTypography
          className={localClasses.root}
          id="customized-dialog-title"
        >
          <Title
            subtitle={gateway?.name || "Without name"}
            style={{ margin: 0 }}
          >
            Gateway Settings
          </Title>

          <IconButton
            aria-label="close"
            className={localClasses.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <form
          // className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"NORMAL"}
                  codingRate={codingRateNORMAL}
                  setCodingRate={setCodingRateNORMAL}
                  transmissionPower={transmissionPowerNORMAL}
                  setTransmissionPower={setTransmissionPowerNORMAL}
                  spreadingFactor={spreadingFactorNORMAL}
                  setSpreadingFactor={setSpreadingFactorNORMAL}
                  band={bandNORMAL}
                  setBand={setBandNORMAL}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"REG"}
                  codingRate={codingRateREG}
                  setCodingRate={setCodingRateREG}
                  transmissionPower={transmissionPowerREG}
                  setTransmissionPower={setTransmissionPowerREG}
                  spreadingFactor={spreadingFactorREG}
                  setSpreadingFactor={setSpreadingFactorREG}
                  band={bandREG}
                  setBand={setBandREG}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"EMER"}
                  codingRate={codingRateEMER}
                  setCodingRate={setCodingRateEMER}
                  transmissionPower={transmissionPowerEMER}
                  setTransmissionPower={setTransmissionPowerEMER}
                  spreadingFactor={spreadingFactorEMER}
                  setSpreadingFactor={setSpreadingFactorEMER}
                  band={bandEMER}
                  setBand={setBandEMER}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={localClasses.root}>
            <Button onClick={handleClose} color="primary">
              CANCEL
            </Button>
            <Button variant="contained" type="submit" color="primary">
              SAVE
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textArea: {
    borderRadius: 5,
    resize: "none",
    width: "100%",
    maxWidth: 250,
    paddingRight: 0,
  },
  formControl: {
    // maxWidth: 220,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default GatewaySettingsModal;
