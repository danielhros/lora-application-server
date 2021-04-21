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
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import deviceApi from "../../api/deviceApi";

import { useFormik } from "formik";
import * as yup from "yup";
import devConsole from "../../devConsole";

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
  const [messageType, setMessageType] = React.useState("NORMAL");

  const [loading, setLoading] = React.useState(false);

  const validationSchema = yup.object({
    newDeviceName: yup
      .string("New Device Name")
      .max(20, "Device Name shouldn't be more then 20 characters length")
      .required("New Device Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      newDeviceName: device?.name || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true);
      try {
        await deviceApi.sendDeviceConfig({
          deviceId: device.id,
          newDeviceName: values.newDeviceName,
          netData: JSON.stringify([
            {
              sf: spreadingFactor,
              power: transmissionPower,
              type: messageType,
            },
          ]),
        });
        resetForm({});
        setLoading(false);
        handleConfirmClose();
      } catch (error) {
        devConsole.log(error);
        setErrors({ serverError: "Something went wrong" });
        setLoading(false);
      }
    },
  });

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
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container>
              {!!formik.errors.serverError ? (
                <Typography color={"error"}>
                  {formik.errors.serverError}
                </Typography>
              ) : null}

              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="newDeviceName"
                label="New Device Name"
                name="newDeviceName"
                value={formik.values.newDeviceName}
                autoFocus
                onChange={formik.handleChange}
                disabled={loading}
                // disabled={updateCredentialsLoading}
                error={
                  formik.touched.newDeviceName &&
                  Boolean(formik.errors.newDeviceName)
                }
                helperText={
                  formik.touched.newDeviceName && formik.errors.newDeviceName
                }
              />

              <FormControl
                margin="normal"
                variant="outlined"
                disabled={loading}
                className={localClasses.formControl}
              >
                <InputLabel id="message-type-select">Message type</InputLabel>
                <Select
                  labelId="message-type-select"
                  id="message-type-select"
                  value={messageType}
                  onChange={(event) => setMessageType(event.target.value)}
                  label="Message type"
                >
                  {["NORMAL", "EMER", "REG"].map((mt) => {
                    return (
                      <MenuItem key={mt} value={mt}>
                        {mt}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                margin="normal"
                variant="outlined"
                disabled={loading}
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
                margin="normal"
                variant="outlined"
                disabled={loading}
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

export default DownlinkMessagesModal;
