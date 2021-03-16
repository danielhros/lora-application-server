import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import MemoryIcon from "@material-ui/icons/Memory";
import List from "@material-ui/core/List";
import { useHistory, useLocation } from "react-router-dom";

const ListItems = () => {
  const history = useHistory();
  const location = useLocation();

  const changeLocation = (newPath) => {
    if (newPath !== location.pathname) {
      history.push(newPath);
    }
  };
  return (
    <List>
      <div>
        <ListItem
          button
          selected={location.pathname === "/"}
          onClick={() => {
            changeLocation("/");
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === "/applications"}
          onClick={() => {
            changeLocation("/applications");
          }}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === "/gateways"}
          onClick={() => {
            changeLocation("/gateways");
          }}
        >
          <ListItemIcon>
            <SettingsInputAntennaIcon />
          </ListItemIcon>
          <ListItemText primary="Gateways" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === "/devices"}
          onClick={() => {
            changeLocation("/devices");
          }}
        >
          <ListItemIcon>
            <MemoryIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === "/allMessages"}
          onClick={() => {
            changeLocation("/allMessages");
          }}
        >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="All Messages" />
        </ListItem>
      </div>
    </List>
  );
};

export default ListItems;
