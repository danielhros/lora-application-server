import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { changeCredentials } from "../actions/auth";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export const Profile = ({ changeCredentials, updateCredentialsLoading }) => {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    userName: process.env.NODE_ENV === "development" ? "admin" : "",
    currentPassword: process.env.NODE_ENV === "development" ? "admin" : "",
    newPassword: process.env.NODE_ENV === "development" ? "admin" : "",
    confirmNewPassword: process.env.NODE_ENV === "development" ? "admin" : "",
  });

  const {
    userName,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmNewPassword) {
      changeCredentials(formData);
    }
  };

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
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              value={userName}
              autoFocus
              onChange={onChange}
              disabled={updateCredentialsLoading}
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
              value={currentPassword}
              onChange={onChange}
              disabled={updateCredentialsLoading}
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
              value={newPassword}
              onChange={onChange}
              disabled={updateCredentialsLoading}
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
              value={confirmNewPassword}
              onChange={onChange}
              disabled={updateCredentialsLoading}
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
});

const mapDispatchToProps = {
  changeCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
