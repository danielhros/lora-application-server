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

  const defaultCodingRate = "4/5";

  const [codingRate, setCodingRate] = React.useState({
    NORMAL: defaultCodingRate,
    EMER: defaultCodingRate,
    REG: defaultCodingRate,
  });

  const defaultTransmissionPower = 5;
  const [transmissionPower, setTransmissionPower] = React.useState({
    NORMAL: defaultTransmissionPower,
    EMER: defaultTransmissionPower,
    REG: defaultTransmissionPower,
  });

  const defaultSpreadingFactor = 7;
  const [spreadingFactor, setSpreadingFactor] = React.useState({
    NORMAL: defaultSpreadingFactor,
    EMER: defaultSpreadingFactor,
    REG: defaultSpreadingFactor,
  });

  const defaultBandwidth = 125;
  const [bandwidth, setBandwidth] = React.useState({
    NORMAL: defaultBandwidth,
    EMER: defaultBandwidth,
    REG: defaultBandwidth,
  });

  const availableFrequencies = [
    "none",
    868.1,
    868.3,
    868.5,
    867.1,
    867.3,
    867.5,
    867.7,
    867.9,
    868.8,
  ];

  const defaultSelectedFrequencies = Array(9).fill("none");
  const [selectedFrequencies, setSelectedFrequencies] = React.useState({
    NORMAL: defaultSelectedFrequencies,
    EMER: defaultSelectedFrequencies,
    REG: defaultSelectedFrequencies,
  });

  // console.log(selectedFrequencies);
  const defaultNumberOfFrequencies = 1;
  const [numOfFrequencies, setNumOfFrequencies] = React.useState({
    NORMAL: defaultNumberOfFrequencies,
    EMER: defaultNumberOfFrequencies,
    REG: defaultNumberOfFrequencies,
  });

  const handleSetFrequency = (value, index, type) => {
    const newSelectedFrequencies = [...selectedFrequencies[type]];
    newSelectedFrequencies[index] = value;
    setSelectedFrequencies({
      ...selectedFrequencies,
      [type]: newSelectedFrequencies,
    });
  };

  const handleAddFrequency = (type) => {
    if (numOfFrequencies[type] < availableFrequencies.length - 1) {
      setNumOfFrequencies({
        ...numOfFrequencies,
        [type]: numOfFrequencies[type] + 1,
      });
    }
  };

  const handleSetBandwidth = (value, type) => {
    setBandwidth({
      ...bandwidth,
      [type]: value,
    });
  };

  const handleSetCodingRate = (value, type) => {
    setCodingRate({
      ...codingRate,
      [type]: value,
    });
  };

  const handleSetTransmissionPower = (value, type) => {
    setTransmissionPower({
      ...transmissionPower,
      [type]: value,
    });
  };

  const handleSetSpreadingFactor = (value, type) => {
    setSpreadingFactor({
      ...spreadingFactor,
      [type]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmClose();
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
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"NORMAL"}
                  codingRate={codingRate.NORMAL}
                  setCodingRate={handleSetCodingRate}
                  transmissionPower={transmissionPower.NORMAL}
                  setTransmissionPower={handleSetTransmissionPower}
                  spreadingFactor={spreadingFactor.NORMAL}
                  setSpreadingFactor={handleSetSpreadingFactor}
                  band={bandwidth.NORMAL}
                  setBand={handleSetBandwidth}
                  selectedFrequencies={selectedFrequencies.NORMAL}
                  handleSetFrequency={(value, index) =>
                    handleSetFrequency(value, index, "NORMAL")
                  }
                  numOfFrequencies={numOfFrequencies.NORMAL}
                  handleAddFrequency={() => handleAddFrequency("NORMAL")}
                  availableFrequencies={availableFrequencies}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"REG"}
                  codingRate={codingRate.REG}
                  setCodingRate={handleSetCodingRate}
                  transmissionPower={transmissionPower.REG}
                  setTransmissionPower={handleSetTransmissionPower}
                  spreadingFactor={spreadingFactor.REG}
                  setSpreadingFactor={handleSetSpreadingFactor}
                  band={bandwidth.REG}
                  setBand={handleSetBandwidth}
                  selectedFrequencies={selectedFrequencies.REG}
                  handleSetFrequency={(value, index) =>
                    handleSetFrequency(value, index, "REG")
                  }
                  numOfFrequencies={numOfFrequencies.REG}
                  handleAddFrequency={() => handleAddFrequency("REG")}
                  availableFrequencies={availableFrequencies}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MessageForm
                  msgType={"EMER"}
                  codingRate={codingRate.EMER}
                  setCodingRate={handleSetCodingRate}
                  transmissionPower={transmissionPower.EMER}
                  setTransmissionPower={handleSetTransmissionPower}
                  spreadingFactor={spreadingFactor.EMER}
                  setSpreadingFactor={handleSetSpreadingFactor}
                  band={bandwidth.EMER}
                  setBand={handleSetBandwidth}
                  selectedFrequencies={selectedFrequencies.EMER}
                  handleSetFrequency={(value, index) =>
                    handleSetFrequency(value, index, "EMER")
                  }
                  numOfFrequencies={numOfFrequencies.EMER}
                  handleAddFrequency={() => handleAddFrequency("EMER")}
                  availableFrequencies={availableFrequencies}
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
