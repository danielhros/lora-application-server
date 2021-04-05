import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Gateways from "./Gateways";
import GatewayDetail from "./GatewayDetail";
import MyBreadcrumbs from "../../components/MyBreadCrumps";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";

import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core";

import NotFound from "../NotFound";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

function GatewayWrapper({ refresh, selected, classes }) {
  let { path } = useRouteMatch();

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
            <Typography color="textPrimary">Gateways</Typography>
          </MyBreadcrumbs>
          <Gateways refresh={refresh} />
        </Route>
        <Route exact path={`${path}/:id`}>
          <React.Fragment>
            <MyBreadcrumbs>
              <RouterLink
                className={classes.breadCrumpsLink}
                color="textPrimary"
                to={"/gateways"}
              >
                Gateways
              </RouterLink>
              {selected === undefined ? null : (
                <Button
                  size="small"
                  className={classes.breadCrumpsButton}
                  endIcon={selected === null ? null : <SettingsIcon />}
                  onClick={handleClickOpen}
                  disabled={selected === null}
                >
                  {selected?.name || "loading"}
                </Button>
              )}
            </MyBreadcrumbs>
            <GatewayDetail
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

const mapStateToProps = ({ gateway }) => ({
  selected: gateway.selected,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(globalStyles)(GatewayWrapper));
