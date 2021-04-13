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
import TextField from "@material-ui/core/TextField";

import { useFormik } from "formik";
import * as yup from "yup";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DownlinkMessagesModal = ({
  open,
  handleClose,
  handleConfirmClose,
  application = null,
}) => {
  const localClasses = useStyles();

  const validationSchema = yup.object({
    newApplicationName: yup
      .string("New Application Name")
      .max(20, "Application Name shouldn't be more then 20 characters length")
      .required("New Application Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      newApplicationName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // TODO: call request here and then close modal
      // https://github.com/formium/formik/issues/446
      handleConfirmClose();
    },
  });

  if (application === null) {
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
            subtitle={application?.name || "Without name"}
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
        <form
          // className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container justify="center">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newApplicationName"
                label="New Application Name"
                name="newApplicationName"
                value={formik.values.newApplicationName}
                autoFocus
                onChange={formik.handleChange}
                // disabled={updateCredentialsLoading}
                error={
                  formik.touched.newApplicationName &&
                  Boolean(formik.errors.newApplicationName)
                }
                helperText={
                  formik.touched.newApplicationName &&
                  formik.errors.newApplicationName
                }
              />
            </Grid>
          </DialogContent>
          <DialogActions>
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
    maxWidth: 220,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default DownlinkMessagesModal;
