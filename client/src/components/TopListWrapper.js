import React from "react";

import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import Title from "./Title";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";

export const TopListWrapper = ({ classes, top }) => {
  return (
    <React.Fragment>
      <Title
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Top{" "}
        <Tooltip
          title="Most used values calculated from all uplink messages."
          arrow
        >
          <HelpOutlineOutlinedIcon style={{ marginLeft: 5 }} />
        </Tooltip>
      </Title>

      <table className={classes.table}>
        <thead style={{ display: "none" }}>
          <tr className={classes.tableHead}>
            <th>attribute</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>message_type</td>
            <td>{top.message_type}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td>frequency</td>
            <td>
              {top.frequency === "error" ||
              top.frequency === "loading.." ||
              top.frequency === "none"
                ? top.frequency
                : `${top.frequency / (1.0 * 1000000)} MHz`}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>SF</td>
            <td>{top.spf}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default withStyles(globalStyles)(TopListWrapper);
