import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Gateways from "./Gateways";
import GatewayDetail from "./GatewayDetail";
import MyBreadcrumbs from "../../components/MyBreadCrumps";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import NoRecourse from "../NoResource";
import NotFound from "../NotFound";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

function GatewayWrapper({ refresh, selected }) {
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
            <Button
              size="small"
              className={classes.button}
              endIcon={<SettingsIcon />}
            >
              {selected?.name || "loading"}
            </Button>
          </MyBreadcrumbs>
          <GatewayDetail />
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

export default connect(mapStateToProps, mapDispatchToProps)(GatewayWrapper);
