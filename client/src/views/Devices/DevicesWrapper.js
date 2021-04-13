import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MyBreadcrumbs from "../../components/MyBreadCrumps";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import NotFound from "../NotFound";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Devices from "./Devices";
import DevicesDetail from "./DevicesDetail";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function DevicesWrapper({ refresh, selected, classes }) {
  let { path } = useRouteMatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("CLosed without save");
    setOpen(false);
  };

  const handleConfirmClose = () => {
    console.log("Closed with success");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path}>
          <MyBreadcrumbs>
            <Typography color="textPrimary">Devices</Typography>
          </MyBreadcrumbs>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Devices refresh={refresh} />
            </Paper>
          </Grid>
        </Route>
        <Route exact path={`${path}/:id`}>
          <React.Fragment>
            <MyBreadcrumbs>
              <RouterLink
                className={classes.breadCrumpsLink}
                color="textPrimary"
                to={"/devices"}
              >
                Devices
              </RouterLink>
              {selected.data === undefined ? null : (
                <Button
                  size="small"
                  className={classes.breadCrumpsButton}
                  endIcon={selected.data === null ? null : <SettingsIcon />}
                  onClick={handleClickOpen}
                  disabled={selected.data === null}
                >
                  {selected.data?.name && selected?.type === "devices"
                    ? selected.data?.name
                    : "loading"}
                </Button>
              )}
            </MyBreadcrumbs>
            <DevicesDetail
              openSettings={open}
              handleSettingsClose={handleClose}
              handleConfirmClose={handleConfirmClose}
              refresh={refresh}
            />
          </React.Fragment>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = ({ result }) => ({
  selected: result.selected,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(DevicesWrapper));
