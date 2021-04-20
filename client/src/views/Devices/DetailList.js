import React from "react";
import Title from "../../components/Title";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import moment from "moment";

export const DetailList = ({ device, width }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Device detail</Title>
      <table>
        <thead className={classes.tableHead}>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>id</td>
            <td>{device?.id || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>gateway name</td>
            <td>{device?.name || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>application name</td>
            <td>{device?.application_name || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>firmware</td>
            <td>{device?.firmware || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>battery</td>
            <td>
              {device.hasOwnProperty("battery")
                ? `${device.battery} %`
                : "none"}
            </td>
          </tr>
        </tbody>
      </table>
      <Divider variant="middle" className={classes.divider} />
      <table>
        <thead className={classes.tableHead}>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>last_seq</td>
            <td>{device?.last_seq || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>upstream_power</td>
            <td>
              {device.hasOwnProperty("upstream_power")
                ? `${device.upstream_power} dBm`
                : "none"}
            </td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>downstream_power</td>
            <td>
              {device.hasOwnProperty("downstream_power")
                ? `${device.downstream_power} dBm`
                : "none"}
            </td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>spf</td>
            <td>{device?.spf || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>
              <React.Fragment>
                duty_cycle_refresh
                <Tooltip
                  title="The time when the duty cycle of gateway is planned. It tells you the minute and second of refresh of this or upcoming hour based on the actual time. Example: Imagine actual time is 16:20:00 and the value of the row is 25:00, the refresh is then planned to 16:25:00. If the value would be set to 15:00, the refresh is planned to 17:15:00."
                  arrow
                >
                  <HelpOutlineOutlinedIcon
                    style={{ marginLeft: 2, height: 20, marginBottom: -5 }}
                  />
                </Tooltip>
              </React.Fragment>
            </td>
            {/* <td>{device?.duty_cycle_refresh || "none"}</td> */}
            <td>
              {device.hasOwnProperty("duty_cycle_refresh")
                ? moment(device.duty_cycle_refresh, "HH:mm:ss").format("mm:ss")
                : "none"}
            </td>
          </tr>
          {isWidthUp("sm", width) ? (
            <>
              <tr className={clsx(classes.tableRow)}>
                <td>stat_model</td>
                <td>
                  <TextareaAutosize
                    className={classes.textArea}
                    value={device?.stat_model?.map((e) =>
                      JSON.stringify(e, undefined, 2)
                    )}
                    readOnly
                    rowsMax={5}
                    aria-label="maximum height"
                  />
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr className={clsx(classes.tableRow)}>
                <td colSpan={2}>stat_model</td>
              </tr>

              <tr className={clsx(classes.tableRow)}>
                <td colSpan={2}>
                  <TextareaAutosize
                    className={classes.textArea}
                    value={device?.stat_model?.map((e) =>
                      JSON.stringify(e, undefined, 2)
                    )}
                    readOnly
                    rowsMax={5}
                    aria-label="maximum height"
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <Divider variant="middle" className={classes.divider} />
      <table>
        <thead className={classes.tableHead}>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>registration_freq</td>
            <td>
              {device.hasOwnProperty("registration_freq")
                ? device.registration_freq
                    .map((reg_freq) => {
                      return `${reg_freq / (1.0 * 1000000)} MHz`;
                    })
                    .join(", ")
                : "none"}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>emergency_freq</td>
            <td>
              {device.hasOwnProperty("emergency_freq")
                ? device.emergency_freq
                    .map((em_freq) => {
                      return `${em_freq / (1.0 * 1000000)} MHz`;
                    })
                    .join(", ")
                : "none"}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>standard_freq</td>
            <td>
              {device.hasOwnProperty("standard_freq")
                ? device.standard_freq
                    .map((s_freq) => {
                      return `${s_freq / (1.0 * 1000000)} MHz`;
                    })
                    .join(", ")
                : "none"}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>coderate</td>
            <td>{device?.coderate || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>bandwidth</td>
            <td>
              {" "}
              {device.hasOwnProperty("bandwidth")
                ? `${device.bandwidth / (1.0 * 1000)} kHz`
                : "none"}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
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
      width: "50%",
      verticalAlign: "top",
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.down("md")]: {
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

export default withWidth()(DetailList);
