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
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory, useLocation } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ListItems = ({ handleDrawerClose, width, logout, getPageName }) => {
  const history = useHistory();
  const location = useLocation();

  let [actualLocation] = location.pathname.split("/").filter((x) => x);
  actualLocation = actualLocation || "dashboard";

  console.log(actualLocation);

  const [openLeaveDialog, setOpenLeaveDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenLeaveDialog(true);
  };

  const handleClose = () => {
    setOpenLeaveDialog(false);
  };

  const changeLocation = (newPath) => {
    if (newPath !== location.pathname) {
      history.push(newPath);
      if (width === "xs" || width === "sm") {
        handleDrawerClose();
      }
    }
  };
  return (
    <>
      <Dialog
        open={openLeaveDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Stay
          </Button>
          <Button onClick={logout} color="primary" autoFocus>
            Leave
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        <div>
          <ListItem
            button
            selected={actualLocation === "dashboard"}
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
            selected={actualLocation === "applications"}
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
            selected={actualLocation === "gateways"}
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
            selected={actualLocation === "devices"}
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
            selected={actualLocation === "allMessages"}
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
      <Divider />
      <List>
        <div>
          <ListItem
            button
            selected={actualLocation === "/profile"}
            onClick={() => {
              changeLocation("/profile");
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={handleClickOpen}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
      </List>
    </>
  );
};

export default connect(undefined, { logout })(withWidth()(ListItems));
