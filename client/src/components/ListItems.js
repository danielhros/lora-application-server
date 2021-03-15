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

const ListItems = () => {
  return (
    <List>
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsInputAntennaIcon />
          </ListItemIcon>
          <ListItemText primary="Gateways" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MemoryIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
        </ListItem>
        <ListItem button>
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
