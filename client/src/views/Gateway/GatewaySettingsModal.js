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
import CircularProgress from "@material-ui/core/CircularProgress";
import gatewayApi from "../../api/gatewayApi";
import devConsole from "../../devConsole";

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

  const [loading, setLoading] = React.useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const setap = {
      message_name: "SETAP",
      ap_id: gateway.id,
      message_body: [
        ...["NORMAL", "EMER", "REG"].map((type) => {
          return {
            type,
            cr: codingRate[type],
            freqs: selectedFrequencies[type].filter((freq) => freq !== "none"),
            band: bandwidth[type],
            power: transmissionPower[type],
            sf: spreadingFactor[type],
          };
        }),
      ],
    };
    setLoading(true);
    try {
      await gatewayApi.sendSetap({
        setap: JSON.stringify(setap),
        gatewayId: gateway.id,
      });
      setLoading(false);
      handleConfirmClose();
    } catch (error) {
      devConsole.log(error);
      setLoading(false);
      handleClose();
    }
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
                  disabled={loading}
                  msgType={"NORMAL"}
                  codingRate={codingRate.NORMAL}
                  setCodingRate={(value) =>
                    handleSetCodingRate(value, "NORMAL")
                  }
                  transmissionPower={transmissionPower.NORMAL}
                  setTransmissionPower={(value) =>
                    handleSetTransmissionPower(value, "NORMAL")
                  }
                  spreadingFactor={spreadingFactor.NORMAL}
                  setSpreadingFactor={(value) =>
                    handleSetSpreadingFactor(value, "NORMAL")
                  }
                  band={bandwidth.NORMAL}
                  setBand={(value) => handleSetBandwidth(value, "NORMAL")}
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
                  disabled={loading}
                  msgType={"REG"}
                  codingRate={codingRate.REG}
                  setCodingRate={(value) => handleSetCodingRate(value, "REG")}
                  transmissionPower={transmissionPower.REG}
                  setTransmissionPower={(value) =>
                    handleSetTransmissionPower(value, "REG")
                  }
                  spreadingFactor={spreadingFactor.REG}
                  setSpreadingFactor={(value) =>
                    handleSetSpreadingFactor(value, "REG")
                  }
                  band={bandwidth.REG}
                  setBand={(value) => handleSetBandwidth(value, "REG")}
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
                  disabled={loading}
                  msgType={"EMER"}
                  codingRate={codingRate.EMER}
                  setCodingRate={(value) => handleSetCodingRate(value, "EMER")}
                  transmissionPower={transmissionPower.EMER}
                  setTransmissionPower={(value) =>
                    handleSetTransmissionPower(value, "EMER")
                  }
                  spreadingFactor={spreadingFactor.EMER}
                  setSpreadingFactor={(value) =>
                    handleSetSpreadingFactor(value, "EMER")
                  }
                  band={bandwidth.EMER}
                  setBand={(value) => handleSetBandwidth(value, "EMER")}
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
            <div className={localClasses.wrapper}>
              <Button
                disabled={loading}
                variant="contained"
                type="submit"
                color="primary"
              >
                SAVE
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={localClasses.buttonProgress}
                />
              )}
            </div>
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
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default GatewaySettingsModal;
