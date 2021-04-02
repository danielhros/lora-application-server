import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Gateways from "./Gateways";
import GatewayDetail from "./GatewayDetail";
import MyBreadcrumbs from "../../components/MyBreadCrumps";
import NotFound from "../../views/NotFound";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function GatewayWrapper({ refresh }) {
  let { path } = useRouteMatch();
  const classes = useStyles();
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
          <MyBreadcrumbs>
            <RouterLink
              className={classes.link}
              color="textPrimary"
              to={"/gateways"}
            >
              Gateways
            </RouterLink>

            <Link className={classes.link}>
              <Grid container direction="row" alignItems="center">
                <Typography color="textPrimary">example</Typography>
                <SettingsIcon />
              </Grid>
            </Link>
          </MyBreadcrumbs>
          <GatewayDetail />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default GatewayWrapper;
