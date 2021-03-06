/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { changeCredentials, resetUpdateCredentials } from "../actions/auth";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    textAlign: "center",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -8,
    marginLeft: -12,
  },
  wrapper: {
    position: "relative",
  },
}));

export const Profile = ({
  changeCredentials,
  updateCredentialsLoading,
  updateCredentialsErrors,
  resetUpdateCredentials,
  user_name,
}) => {
  const classes = useStyles();

  const validationSchema = yup.object({
    userName: yup
      .string("User Name*")
      .max(50, "User Name shouldn't be more then 50 characters length")
      .required("User Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    currentPassword: yup
      .string("Current Password*")
      .min(5, "Current Password should be of minimum 5 characters length")
      .required("Current Password is required"),
    newPassword: yup
      .string("New Password")
      .min(5, "Password should be of minimum 5 characters length")
      .required("This field is required"),
    confirmNewPassword: yup
      .string()
      .min(5, "Password should be of minimum 5 characters length")
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("newPassword")], "Both password need to be the same"),
      }),
  });

  const formik = useFormik({
    initialValues: {
      userName: user_name || "",
      currentPassword: process.env.NODE_ENV === "development" ? "admin" : "",
      newPassword: process.env.NODE_ENV === "development" ? "admin" : "",
      confirmNewPassword: process.env.NODE_ENV === "development" ? "admin" : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changeCredentials(values);
    },
  });

  React.useEffect(() => {
    resetUpdateCredentials();
  }, []);

  const userNameError = updateCredentialsErrors.find(
    (e) => e.param === "newUsername"
  );
  const oldPassword = updateCredentialsErrors.find(
    (e) => e.param === "oldPassword"
  );
  const newPasswordError = updateCredentialsErrors.find(
    (e) => e.param === "newPassword"
  );

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={5}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Change your credentials
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              value={formik.values.userName}
              autoFocus
              onChange={formik.handleChange}
              disabled={updateCredentialsLoading}
              error={
                (formik.touched.userName && Boolean(formik.errors.userName)) ||
                !!userNameError
              }
              helperText={
                (formik.touched.userName && formik.errors.userName) ||
                (!!userNameError && userNameError.msg)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
              id="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              disabled={updateCredentialsLoading}
              error={
                (formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)) ||
                !!oldPassword
              }
              helperText={
                (formik.touched.currentPassword &&
                  formik.errors.currentPassword) ||
                (!!oldPassword && oldPassword.msg)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              disabled={updateCredentialsLoading}
              error={
                (formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)) ||
                !!newPasswordError
              }
              helperText={
                (formik.touched.newPassword && formik.errors.newPassword) ||
                (!!newPasswordError && newPasswordError.msg)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmNewPassword"
              label="Confirm new Password"
              type="password"
              id="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              disabled={updateCredentialsLoading}
              error={
                formik.touched.confirmNewPassword &&
                Boolean(formik.errors.confirmNewPassword)
              }
              helperText={
                formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword
              }
            />
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                disabled={updateCredentialsLoading}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirm
              </Button>
              {updateCredentialsLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ auth }) => ({
  updateCredentialsLoading: auth.updateCredentialsLoading,
  updateCredentialsErrors: auth.updateCredentialsErrors,
  user_name: auth.user.user_name,
});

const mapDispatchToProps = {
  changeCredentials,
  resetUpdateCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
