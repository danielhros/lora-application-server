import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Gateways from "./Gateways";
import GatewayDetail from "./GatewayDetail";
import MyBreadcrumbs from "../../components/MyBreadCrumps";

function GatewayWrapper({ refresh }) {
  let { path } = useRouteMatch();
  return (
    <React.Fragment>
      <MyBreadcrumbs />
      <Switch>
        <Route exact path={path}>
          <Gateways refresh={refresh} />
        </Route>
        <Route path={`${path}/:id`}>
          <GatewayDetail />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default GatewayWrapper;
