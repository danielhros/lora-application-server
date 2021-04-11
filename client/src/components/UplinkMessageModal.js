import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const UplinkMessageModal = ({ open, handleClose, message = null, width }) => {
  const localClasses = useStyles();

  if (message === null) {
    return null;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <MuiDialogTitle
          disableTypography
          className={localClasses.root}
          id="customized-dialog-title"
        >
          <Title style={{ margin: 0 }}>Uplink message detail</Title>
          {handleClose ? (
            <IconButton
              aria-label="close"
              className={localClasses.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
        <DialogContent dividers>
          <table>
            <thead className={localClasses.tableHead}>
              <tr>
                <th>key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr className={localClasses.tableRow}>
                <td>received</td>
                <td>{message?.receive_time || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>device_id</td>
                <td>{message?.node_id || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>device_name</td>
                <td>{message?.node_name || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>application_name</td>
                <td>{message?.application_name || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>application_id</td>
                <td>{message?.application_id || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>gateway_name</td>
                <td>{message?.gateway_name || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>gateway_id</td>
                <td>{message?.ap_id || "none"}</td>
              </tr>
            </tbody>
          </table>
          <Divider variant="middle" className={localClasses.divider} />
          <table>
            <thead className={localClasses.tableHead}>
              <tr>
                <th>key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr className={localClasses.tableRow}>
                <td>signal_to_noise_ratio</td>
                <td>{message?.snr || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>received_signal_strength</td>
                <td>{message?.rssi || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>duty_cycle_remaining</td>
                <td>{message?.duty_cycle_remaining || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>is_primary</td>
                <td>
                  {message.hasOwnProperty("is_primary")
                    ? message.is_primary
                      ? "yes"
                      : "no"
                    : "none"}
                </td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>sequence_number</td>
                <td>{message?.seq || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>frequency</td>
                <td>{message?.frequency || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>spreading_factor</td>
                <td>{message?.spf || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>transition_power</td>
                <td>{message?.power || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>airtime</td>
                <td>{message?.airtime || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>coding_rate</td>
                <td>{message?.coderate || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>bandwidth</td>
                <td>{message?.bandwidth || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>message_group_number</td>
                <td>{message?.msg_group_number || "none"}</td>
              </tr>
              <tr className={localClasses.tableRow}>
                <td>message_type</td>
                <td>{message?.message_type_name || "none"}</td>
              </tr>
              {isWidthUp("sm", width) ? (
                <>
                  <tr className={clsx(localClasses.tableRow)}>
                    <td>stat_model</td>
                    <td>
                      <TextareaAutosize
                        className={localClasses.textArea}
                        value={message?.app_data || ""}
                        readOnly
                        rowsMax={9}
                        aria-label="maximum height"
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className={clsx(localClasses.tableRow)}>
                    <td colSpan={2}>app_data</td>
                  </tr>

                  <tr className={clsx(localClasses.tableRow)}>
                    <td colSpan={2}>
                      <TextareaAutosize
                        className={localClasses.textArea}
                        value={message?.app_data || ""}
                        readOnly
                        rowsMax={9}
                        aria-label="maximum height"
                      />
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  table: {
    borderCollapse: "collapse",
  },
  tableHead: {
    display: "none",
  },
  tableRow: {
    "& > td:first-child": {
      textAlign: "right",
      paddingRight: 15,
      width: 250,
      verticalAlign: "top",
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.down("xs")]: {
        width: 120,
        textAlign: "left",
        whiteSpace: "nowrap",
      },
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textArea: {
    borderRadius: 5,
    resize: "none",
    width: "100%",
    maxWidth: 250,
    paddingRight: 0,
  },
  tableBody: {},
}));

export default withWidth()(UplinkMessageModal);
