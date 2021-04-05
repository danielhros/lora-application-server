import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MyBreadcrumbs from "../../components/MyBreadCrumps";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import NotFound from "../NotFound";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Devices from "./Devices";
import DevicesDetail from "./DevicesDeatail";

function DevicesWrapper({ refresh, selected }) {
  let { path } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path}>
          <MyBreadcrumbs>
            <Typography color="textPrimary">Devices</Typography>
          </MyBreadcrumbs>
          <Devices refresh={refresh} />
        </Route>
        <Route exact path={`${path}/:id`}>
          <React.Fragment>
            <MyBreadcrumbs>
              <RouterLink
                className={classes.link}
                color="textPrimary"
                to={"/devices"}
              >
                Devices
              </RouterLink>
              {selected === undefined ? null : (
                <Button
                  size="small"
                  className={classes.button}
                  endIcon={selected === null ? null : <SettingsIcon />}
                  onClick={handleClickOpen}
                  disabled={selected === null}
                >
                  {selected?.name || "loading"}
                </Button>
              )}
            </MyBreadcrumbs>
            <DevicesDetail
              openSettings={open}
              handleSettingsClose={handleClose}
              refresh={refresh}
            />
          </React.Fragment>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  nameText: {
    marginRight: theme.spacing(1),
  },
  link: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    padding: 0,
  },
}));

const mapStateToProps = ({ gateway }) => ({
  selected: gateway.selected,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesWrapper);
