import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DownlinkMessagesModal = ({
  open,
  handleClose,
  handleConfirmClose,
  device = null,
}) => {
  const localClasses = useStyles();

  const [spreadingFactor, setSpreadingFactor] = React.useState(7);
  const [transmissionPower, setTransmissionPower] = React.useState(5);

  if (device === null) {
    return null;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <MuiDialogTitle
          disableTypography
          className={localClasses.root}
          id="customized-dialog-title"
        >
          <Title
            subtitle={device?.name || "Without name"}
            style={{ margin: 0 }}
          >
            Device Settings
          </Title>

          <IconButton
            aria-label="close"
            className={localClasses.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <FormControl
              variant="outlined"
              className={localClasses.formControl}
            >
              <InputLabel id="spreading-factor-select">
                Spreading Factor
              </InputLabel>
              <Select
                labelId="spreading-factor-select"
                id="spreading-factor-select"
                value={spreadingFactor}
                onChange={(event) => setSpreadingFactor(event.target.value)}
                label="Spreading Factor"
                style={{ marginBottom: 30 }}
              >
                {[7, 8, 9, 10, 11, 12].map((sf) => {
                  return (
                    <MenuItem key={sf} value={sf}>
                      {sf}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              variant="outlined"
              className={localClasses.formControl}
            >
              <InputLabel id="transmission-power-select">
                Transmission Power
              </InputLabel>
              <Select
                labelId="transmission-power-select"
                id="transmission-power-select"
                value={transmissionPower}
                onChange={(event) => setTransmissionPower(event.target.value)}
                label="Transmission Power"
              >
                {[
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                ].map((tp) => {
                  return (
                    <MenuItem key={tp} value={tp}>
                      {tp}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleConfirmClose({ sf: spreadingFactor, tp: transmissionPower })
            }
            color="primary"
          >
            SAVE
          </Button>
        </DialogActions>
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
    maxWidth: 220,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default DownlinkMessagesModal;
