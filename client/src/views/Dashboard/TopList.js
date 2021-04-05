import React from "react";

import { makeStyles } from "@material-ui/core/styles";

export const TopList = () => {
  const classes = useStyles();
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

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: "collapse",

    "& tr:not(:last-child)": {
      borderBottom: "0.1px solid rgba(255, 255, 255, 0.12)",
    },

    "& td": {
      width: "50%",
    },
  },
  tableHead: {
    "& > th:first-child": {
      textAlign: "right",
      paddingRight: 10,
    },
    "& > th:last-child": {
      textAlign: "left",
      paddingLeft: 10,
    },
    "& > th": {
      paddingBottom: 10,
    },
  },
  tableRow: {
    "& > td:first-child": {
      textAlign: "right",
      paddingRight: 10,
    },
    "& > td:last-child": {
      textAlign: "left",
      paddingLeft: 10,
    },
    "& > td": {
      paddingBottom: 5,
      paddingTop: 5,
    },
  },
}));

export default TopList;
