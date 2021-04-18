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
import applicationApi from "../../api/applicationApi";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFormik } from "formik";
import * as yup from "yup";
import devConsole from "../../devConsole";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ApplicationSettingsModal = ({
  open,
  handleClose,
  handleConfirmClose,
  application = null,
}) => {
  const localClasses = useStyles();

  const [loading, setLoading] = React.useState(false);

  const validationSchema = yup.object({
    newApplicationName: yup
      .string("New Application Name")
      .max(20, "Application Name shouldn't be more then 20 characters length")
      .required("New Application Name is required"),
    newApplicationDescription: yup
      .string("New Application Description")
      .required("New Application Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      newApplicationName: application?.name || "",
      newApplicationDescription: application?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true);
      try {
        await applicationApi.setNewApplicationName({
          newApplicationName: values.newApplicationName,
          newApplicationDescription: values.newApplicationDescription,
          applicationId: application.id,
        });
        handleConfirmClose();
        resetForm({});
      } catch (error) {
        devConsole.log(error);
        setErrors({ serverError: "Something went wrong" });
      }
      setLoading(false);
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
        disabled={loading}
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
            Application Settings
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
            {!!formik.errors.serverError ? (
              <Typography color={"error"}>
                {formik.errors.serverError}
              </Typography>
            ) : null}

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
                disabled={loading}
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newApplicationDescription"
                label="New Application Description"
                name="newApplicationDescription"
                value={formik.values.newApplicationDescription}
                onChange={formik.handleChange}
                disabled={loading}
                // disabled={updateCredentialsLoading}
                error={
                  formik.touched.newApplicationDescription &&
                  Boolean(formik.errors.newApplicationDescription)
                }
                helperText={
                  formik.touched.newApplicationDescription &&
                  formik.errors.newApplicationDescription
                }
              />
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
    maxWidth: 220,
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

export default ApplicationSettingsModal;
