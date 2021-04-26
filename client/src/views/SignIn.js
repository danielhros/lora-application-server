/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, resetSignIn } from "../actions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const SignIn = ({
  isAuthenticated,
  login,
  resetSignIn,
  signInErrors,
  signInLoading,
}) => {
  const classes = useStyles();

  const validationSchema = yup.object({
    userName: yup
      .string("User Name*")
      .max(50, "User Name shouldn't be more then 50 characters length")
      .required("User Name is required"),
    password: yup
      .string("Password*")
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: process.env.NODE_ENV === "development" ? "admin" : "",
      password: process.env.NODE_ENV === "development" ? "admin" : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { userName, password } = values;
      login({ userName, password });
    },
  });

  // const [rememberMe, setRememberMe] = React.useState(true);

  React.useEffect(() => {
    resetSignIn();
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const userNameError = signInErrors.find((e) => e.param === "username");
  const passwordError = signInErrors.find((e) => e.param === "password");
  const credentialsError = signInErrors.find((e) => e.param === "credentials");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          {!!credentialsError && (
            <Typography color={"error"}>{credentialsError.msg}</Typography>
          )}
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
            disabled={signInLoading}
            error={
              (formik.touched.userName && Boolean(formik.errors.userName)) ||
              !!userNameError
            }
            helperText={
              (formik.touched.userName && formik.errors.userName) ||
              (userNameError && userNameError.msg)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            disabled={signInLoading}
            error={
              (formik.touched.password && Boolean(formik.errors.password)) ||
              !!passwordError
            }
            helperText={
              (formik.touched.password && formik.errors.password) ||
              (!!passwordError && passwordError.msg)
            }
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          /> */}
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={signInLoading}
              className={classes.submit}
            >
              Sign In
            </Button>
            {signInLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({
  signInLoading: auth.signInLoading,
  isAuthenticated: auth.isAuthenticated,
  signInErrors: auth.signInErrors,
});

const mapDispatchToProps = { login, resetSignIn };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
