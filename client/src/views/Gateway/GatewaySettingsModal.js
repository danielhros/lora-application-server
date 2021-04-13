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

import { useFormik } from "formik";
import * as yup from "yup";

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

  const validationSchema = yup.object(
    Object.assign(
      {},
      ...["NORMAL", "REG", "EMER"].map((msg) => {
        return {
          [`band_${msg}`]: yup
            .number("Field has to be number")
            .positive("Number has to be positive")
            .integer("Number has to be integer")
            .required("The Coding Rate field is required"),
        };
      })
    )
  );

  const formik = useFormik({
    initialValues: {
      band_NORMAL: "",
      band_REG: "",
      band_EMER: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // TODO: call request here and then close modal
      // https://github.com/formium/formik/issues/446
      handleConfirmClose();
    },
  });

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
          onSubmit={formik.handleSubmit}
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
                  band={formik.values.band_NORMAL}
                  handleChange={formik.handleChange}
                  bandTouch={formik.touched.band_NORMAL}
                  bandError={formik.errors.band_NORMAL}
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
                  band={formik.values.band_REG}
                  handleChange={formik.handleChange}
                  bandTouch={formik.touched.band_REG}
                  bandError={formik.errors.band_REG}
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
                  band={formik.values.band_EMER}
                  handleChange={formik.handleChange}
                  bandTouch={formik.touched.band_EMER}
                  bandError={formik.errors.band_EMER}
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
