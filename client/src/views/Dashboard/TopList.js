import React from "react";

import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";

export const TopList = ({ classes }) => {
  return (
    <table className={classes.table}>
      <thead style={{ display: "none" }}>
        <tr className={classes.tableHead}>
          <th>attribute</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.tableRow}>
          <td>SF</td>
          <td>7</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>Frequency</td>
          <td>868 MHz</td>
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(globalStyles)(TopList);
