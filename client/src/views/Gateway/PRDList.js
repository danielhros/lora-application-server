import React from "react";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";

export const PRDList = ({ classes }) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tableHead}>
          <th>channel</th>
          <th>PDR</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.tableRow}>
          <td>7</td>
          <td>45%</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>8</td>
          <td>55%</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>9</td>
          <td>65%</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>10</td>
          <td>75%</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>11</td>
          <td>85%</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>13</td>
          <td>95%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(globalStyles)(PRDList);
