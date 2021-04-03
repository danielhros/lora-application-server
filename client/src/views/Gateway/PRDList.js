import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

export const PRDList = () => {
  const classes = useStyles();
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PRDList);
