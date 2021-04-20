import React from "react";
import { connect } from "react-redux";
import Title from "../../components/Title";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Firmware from "../../components/Firmware";

export const DetailList = ({ gateway, width }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Gateway detail</Title>
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
            <td>{gateway?.id || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>gateway name</td>
            <td>{gateway?.name || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>firmware</td>
            <td>
              {gateway.hasOwnProperty("firmware") ? (
                <Firmware firmware={gateway.firmware} />
              ) : (
                "none"
              )}
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
            <td>protocol_ver</td>
            <td>{gateway?.lora_protocol_ver || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>max_power</td>
            <td>
              {gateway.hasOwnProperty("max_power")
                ? `${gateway.max_power} dBm`
                : "none"}
            </td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>channels_num</td>
            <td>{gateway?.channels_num || "none"}</td>
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
            <td>
              {gateway.hasOwnProperty("duty_cycle_refresh")
                ? moment(gateway.duty_cycle_refresh, "HH:mm:ss").format("mm:ss")
                : "none"}
            </td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>lora_protocol</td>
            <td>{gateway?.lora_protocol || "none"}</td>
          </tr>
          <tr className={clsx(classes.tableRow)}>
            <td>lora_protocol_ver</td>
            <td>{gateway?.lora_protocol_ver || "none"}</td>
          </tr>

          {isWidthUp("sm", width) ? (
            <>
              <tr className={clsx(classes.tableRow)}>
                <td>stat_model</td>
                <td>
                  <TextareaAutosize
                    className={classes.textArea}
                    value={gateway?.stat_model?.map((e) =>
                      JSON.stringify(e, undefined, 2)
                    )}
                    readOnly
                    rowsMax={9}
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
                    value={gateway?.stat_model?.map((e) =>
                      JSON.stringify(e, undefined, 2)
                    )}
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
              {gateway.hasOwnProperty("registration_freq")
                ? gateway.registration_freq
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
              {gateway.hasOwnProperty("emergency_freq")
                ? gateway.emergency_freq
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
              {gateway.hasOwnProperty("standard_freq")
                ? gateway.standard_freq
                    .map((s_freq) => {
                      return `${s_freq / (1.0 * 1000000)} MHz`;
                    })
                    .join(", ")
                : "none"}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>coderate</td>
            <td>{gateway?.coderate || "none"}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>bandwidth</td>
            <td>
              {" "}
              {gateway.hasOwnProperty("bandwidth")
                ? `${gateway.bandwidth / (1.0 * 1000)} kHz`
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(DetailList));
